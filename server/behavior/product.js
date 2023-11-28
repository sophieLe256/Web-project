import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

{/*
Using Table: 
product(productID, versionDate, name, features, image, size, price, categoriesID, status)
categories(categoriesID, type)
OrderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)

Function:
addProduct()
updateProduct()
removeProduct()
getCategories()
getProduct()
getProductDeatail()

Behavior:
+ addProduct: directly insert.
+ update process: 
    + change All Product directly
    + if in used in OderItem, create dulicate ProductID but which new timeslapse
+ remove process:
    + set status Product from 1 to 0 if used
    + remove if not in use
+ getProduct:
    + Case 1: get product by ID => JOIN product, catergoires, product extra
    + Case 2: get product by Categories, limit size, page => JOIN product, catergoires

Package Struct:
addProduct_data = {
    name: name,
    features: features,
    image: name_image,
    categoriesID: categoriesID,      
    size: size,  
    price: price,
}
updateProduct_data = {
    productID: productID,
    versionDate: optional, -- find the top Status =1
    name: name,
    features: features,
    image: name_image,
    categoriesID: categoriesID,      
    size: size,  
    price: price,
}
removeProduct_data = {                  
    productID: productID,
    versionDate: optional, -- find the top Status =1
}
getProduct_data = {    
    page: pageNnumber, -- default 1
    limit: numberOfItem,
    categoriesID: categoriesID -- {null or ID ???}
}
getProductDetail_data = {
    productID: productID,
    versionDate: optional, -- find the top Status =1
}
Good luck, Ac Nhon.
*/}
export default class Product {

    static addProduct(inputD, res) {
        try {
            let entryData = inputD.entry;
            if (entryData.image === null || entryData.image === undefined || entryData.image.replace(' ', '').trim() === '')
                entryData.image = "not-found.png"
            // insert new Product
            const newProductQuery = `INSERT INTO product( versionDate, name, features, image, size, price, categoriesID, status) VALUES (?,?,?,?,?,?,${entryData.categoriesID},1)`;
            const currentDate = new Date();
            const values = [currentDate, entryData.name, entryData.features, entryData.image, entryData.size, entryData.price];
            db.execute(newProductQuery, values, (err, data1) => {
                // //console.log(data);
                if (err) return res.status(500).json(err);
                return res.status(200).json("Product Added Succesful.");
            })

        }
        catch (error) {
            return res.status(401).json("addProduct fail. ", error);
        }
    }
    static removeProduct(inputD, res) {
        try {
            let entryData = inputD.entry;
            if (entryData.productID === null) return res.status(400).json("Remove Product fail (no ID)");
            // get current active product
            db.execute(`SELECT * FROM product WHERE productID = ${entryData.productID} AND status = 1`, (err, data1) => {
                if (err) return res.status(500).json(err);
                if (data1.length === 0) return res.status(200).json("Remove Product Succesful.");
                const currentVersion = data1[0].versionDate;
                // check is this used in any Order Item
                db.execute(`SELECT * FROM orderItem WHERE productID = ${entryData.productID} AND versionDate = '${currentVersion}'`, (err, data2) => {
                    if (err) return res.status(500).json(err);
                    if (data2.length === 0) {
                        // not in use                   
                        db.execute(`DELETE FROM product WHERE productID = ${entryData.productID} AND versionDate = '${currentVersion}'`, (err, data3) => {
                            if (err) return res.status(500).json(err);
                            return res.status(200).json("Remove Product Succesful.");
                        });
                    }
                    else {
                        // in using
                        db.execute(`UPDATE product SET status = 0 WHERE productID = ${entryData.productID}`, (err, data3) => {
                            if (err) return res.status(500).json(err);
                            return res.status(200).json("Product in use, Disabled Product Succesful.");
                        });
                    }
                });

            });
        }
        catch (error) {
            return res.status(401).json("removeProduct fail. ", error);
        }
    }
    static updateProduct(inputD, res) {
        // try {
        //console.log("inputD = ", inputD)
        let entryData = inputD.entry;
        if (entryData.image === null || entryData.image === undefined || entryData.image.replace(' ', '').trim() === '')
            entryData.image = "not-found.png"
        if (entryData.productID === null) return res.status(400).json("Update Product fail (no ID)");
        // get current active product by ID:
        db.execute(`SELECT * FROM product WHERE productID = ${entryData.productID} AND status = 1`, (err, data1) => {
            if (err) return res.status(500).json(err);
            if (data1.length === 0) return res.status(401).json("Update Product fail. Not found");
            const oldVersion = data1[0].versionDate;
            // check is this used in any Order
            db.execute(`SELECT * FROM orderItem WHERE productID = ${entryData.productID} AND versionDate = '${oldVersion}'`, (err, data2) => {
                if (err) return res.status(500).json(err);
                if (data2.length === 0) {
                    // not in use
                    const overrideProductQuery = `UPDATE product SET versionDate = ?, name = ?, features = ?, image = ?, size = ?, price = ?, categoriesID = ${entryData.categoriesID}, status = 1 WHERE productID = ${entryData.productID} AND versionDate = ?`;
                    const currentDate = new Date();
                    const values = [currentDate, entryData.name, entryData.features, entryData.image, entryData.size, entryData.price, oldVersion];
                    db.execute(overrideProductQuery, values, (err, data3) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Update Product Succesful.");
                    });
                }
                else {
                    // create new and disable old one.
                    // disable old one                    
                    db.execute(`UPDATE product SET status = 0 WHERE productID = ${entryData.productID} AND versionDate = '${oldVersion}'`, (err, data3) => {
                        if (err) return res.status(500).json(err);
                        // create new one
                        const createProductQuery = `INSERT INTO product( productID, versionDate, name, features, image, size, price, categoriesID, status) VALUES (${entryData.productID},?,?,?,?,?,?,${entryData.categoriesID},1)`;
                        const currentDate = new Date();
                        const values = [currentDate, entryData.name, entryData.features, entryData.image, entryData.size, entryData.price];
                        db.execute(createProductQuery, values, (err, data3) => {
                            if (err) return res.status(500).json(err);
                            return res.status(200).json("Update Product Succesful.");
                        });
                    });
                }
            });

        });
        // }
        // catch (error) {
        //     return res.status(401).json("updateProduct fail. ", error);
        // }
    }
    static getCategories(key, res) {
        try {
            const q = "SELECT * FROM categories";
            db.execute(q, (err, data) => {
                if (err) return res.json(err);
                // let return it in protected package
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), data);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(401).json("getCategories fail. ", error);
        }
    }
    static getNewestProduct(key, inputD, res) {
        try {
            let entryData = inputD.entry;
            let limit = 9;
            if (entryData.limit !== null) {
                limit = parseInt(entryData.limit);
            }
            db.execute(`SELECT * FROM product NATURAL LEFT JOIN categories WHERE status = 1 ORDER BY versionDate DESC LIMIT ${limit};`, (err, data) => {
                if (err) return res.status(500).json(err);
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), data);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(401).json("getNewestProduct fail. ", error);
        }
    }
    static getProduct(key, inputD, res) {
        try {
            let entryData = inputD.entry;

            let limit = 9;
            let page = 1;
            if (entryData.limit !== null && entryData.limit !== undefined)
                limit = parseInt(entryData.limit);
            if (entryData.page !== null && entryData.page !== undefined)
                page = parseInt(entryData.page);
            if (entryData.categoriesID === null || entryData.categoriesID === undefined) {
                // count total item
                db.execute("SELECT COUNT(*) AS totalPage FROM product NATURAL LEFT JOIN categories WHERE status = 1", (err, data1) => {
                    if (err) return res.status(500).json(err);
                    let totalPage = Math.ceil(parseInt(data1[0].totalPage) / limit);
                    if (totalPage <= 0) totalPage = 1;
                    if (page > totalPage) page = totalPage;

                    // all things
                    db.execute(`SELECT * FROM product NATURAL LEFT JOIN categories WHERE status = 1 LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, data2) => {
                        if (err) return res.status(500).json(err);
                        let packages = {
                            totalPage: totalPage,
                            page: page,
                            data: data2
                        }
                        const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), packages);
                        return res.status(200).json(encryptedData);
                    });
                });
            }
            else {

                // count total item
                db.execute(`SELECT COUNT(*) FROM product NATURAL LEFT JOIN categories WHERE status = 1 AND categoriesID = ${entryData.categoriesID}`, (err, data1) => {
                    if (err) return res.status(500).json(err);
                    let totalPage = Math.ceil(parseInt(data1[0]) / limit);
                    if (page > totalPage) page = totalPage;
                    // all things
                    db.execute(`SELECT * FROM product NATURAL LEFT JOIN categories WHERE status = 1 AND categoriesID = ${entryData.categoriesID} LIMIT ${limit} OFFSET ${(page - 1) * limit}`, (err, data2) => {
                        if (err) return res.status(500).json(err);
                        let packages = {
                            totalPage: totalPage,
                            page: page,
                            data: data2
                        }
                        const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), packages);
                        return res.status(200).json(encryptedData);
                    });
                });
            }
        }
        catch (error) {
            return res.status(401).json("getProduct fail. ", error);
        }
    }
    static getProductDetail(key, inputD, res) {
        try {
            let entryData = inputD.entry;
            if (entryData.productID === undefined) return res.status(400).json("Not found Product (no ID)");
            if (entryData.versionDate === undefined) {
                // get up to date
                // get current active product
                db.execute(`SELECT * FROM product WHERE productID = ${entryData.productID} AND status = 1`, (err, data1) => {
                    if (err) return res.status(500).json(err);
                    if (data1.length == 0) return res.status(401).json("Product Not found or removed");
                    const currentVersion = data1[0].versionDate;

                    db.execute(`SELECT * FROM product NATURAL LEFT JOIN categories WHERE productID = ${entryData.productID} AND versionDate = '${currentVersion}'`, (err, data2) => {
                        if (err) return res.status(500).json(err);
                        const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), data2[0]);
                        return res.status(200).json(encryptedData);
                    });
                });
            }
            else {
                // get something in the past
                db.execute(`SELECT * FROM product NATURAL LEFT JOIN categories WHERE productID = ${entryData.productID} AND versionDate = '${entryData.versionDate}'`, (err, data1) => {
                    if (err) return res.status(500).json(err);
                    const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), data1[0]);
                    return res.status(200).json(encryptedData);
                });
            }
        }
        catch (error) {
            return res.status(401).json("getProductDetail fail. ", error);
        }

    }

}