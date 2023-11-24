import MySecurity from "./mySecurity";

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

    static addProduct(req, res) {
        const entryData = req.data.entry;
        // insert new Product
        const newProductQuery = "INSERT INTO product( versionDate, name, features, image, size, price, categoriesID, status) VALUES (?)";
        const currentDate = new Date();
        const values = [
            currentDate,
            entryData.name,
            entryData.features,
            entryData.image,
            entryData.size,
            entryData.price,
            entryData.categoriesID,
            1
        ]
        db.query(newProductQuery, values, (err, data) => {
            // console.log(data);
            if (err) return res.status(500).json(err);
            return res.status(200).json("Product Added Succesful.");
        })
    }
    static removeProduct(req, res) {
        const entryData = req.data.entry;
        if (entryData.productID == null) return res.status(400).json("Remove Product fail (no ID)");
        // get current active product
        db.query("SELECT * FROM product WHERE productID = ? AND status = 1", [entryData.productID], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(401).json("Remove Product fail. Not found");
            const currentVersion = data[0].versionDate;
            // check is this used in any Order Item
            db.query("SELECT * FROM orderItem WHERE productID = ? AND versionDate = ?", [entryData.productID, currentVersion], async (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.length == 0) {
                    // not in use                   
                    db.query("DELETE FROM product WHERE productID = ? AND versionDate = ?", [entryData.productID, currentVersion], (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Remove Product Succesful.");
                    });
                }
                else {
                    // in using
                    db.query("UPDATE product SET status = 0 WHERE productID = ?", [entryData.productID], (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Product in use, Disabled Product Succesful.");
                    });


                }
            });

        });
    }
    static updateProduct(req, res) {
        const entryData = req.data.entry;
        if (entryData.productID == null) return res.status(400).json("Update Product fail (no ID)");
        // get current active product by ID:
        db.query("SELECT * FROM product WHERE productID = ? AND status = 1", [entryData.productID], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(401).json("Update Product fail. Not found");
            const oldVersion = data[0].versionDate;
            // check is this used in any Order
            db.query("SELECT * FROM orderItem WHERE productID = ? AND versionDate = ?", [entryData.productID, oldVersion], async (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.length == 0) {
                    // not in use
                    const overrideProductQuery = "UPDATE product SET versionDate = ?, name = ?, features = ?, image = ?, size = ?, price = ?, categoriesID = ?, status = 1 WHERE productID = ? AND versionDate = ?";
                    const currentDate = new Date();
                    const values = [
                        currentDate,
                        entryData.name,
                        entryData.features,
                        entryData.image,
                        entryData.size,
                        entryData.price,
                        entryData.categoriesID,
                        entryData.productID,
                        oldVersion
                    ]
                    db.query(overrideProductQuery, values, (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Update Product Succesful.");
                    });
                }
                else {
                    // create new and disable old one.
                    await db.beginTransaction();
                    // disable old one
                    try {
                        await db.query("UPDATE product SET status = 0 WHERE productID = ? AND versionDate = ?", [entryData.productID, oldVersion], (err, data) => {
                            if (err) throw new Error(err);
                        });
                        // create new one
                        const createProductQuery = "INSERT INTO product( productID, versionDate, name, features, image, size, price, categoriesID, status) VALUES (?)";
                        const currentDate = new Date();
                        const values = [
                            entryData.productID,
                            currentDate,
                            entryData.name,
                            entryData.features,
                            entryData.image,
                            entryData.size,
                            entryData.price,
                            entryData.categoriesID,
                            1
                        ]
                        await db.query(createProductQuery, values, (err, data) => {
                            if (err) throw new Error(err);
                        });
                        // all ok, let commit
                        await connection.commit();
                        return res.status(200).json("Update Product Succesful.");
                    }
                    catch (error) {
                        await connection.rollback();
                        return res.status(200).json("Update Product fail.");
                    }

                }
            });

        });
    }
    static getCategories(req, res) {
        const q = "SELECT * FROM categories"
        db.query(q, (err, data) => {
            if (err) return res.json(err);
            // let return it in protected package
            const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.partOfkey), data);
            return res.status(200).json(encryptedData);
        });
    }
    static getProduct(req, res) {
        const entryData = req.data.entry;
        const limit = 9 ;
        const page =1;
        if (entryData.limit != null) 
            limit = parseInt(entryData.limit);
        if (entryData.page != null)
            page = parseInt(entryData.page);
        if (entryData.categoriesID == null) 
        {
            // count total item
            db.query("SELECT COUNT(*) FROM product LEFT NATURAL JOIN categories WHERE status = 1", (err, data) => {
                if (err) return res.status(500).json(err);
                const totalPage = parseInt(data[0])/limit;
                if(page>totalPage) page = totalPage;
                // all things
                db.query("SELECT * FROM product LEFT NATURAL JOIN categories WHERE status = 1 LIMIT ? OFFSET ?", [limit, (page - 1) * limit], (err, data) => {
                    if (err) return res.status(500).json(err);
                    const package = {
                        totalPage: totalPage,
                        page: page,
                        data: data
                    }
                    const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.partOfkey), package);
                    return res.status(200).json(encryptedData);
                });                
            });            
        }
        else{
            // count total item
            db.query("SELECT COUNT(*) FROM product LEFT NATURAL JOIN categories WHERE status = 1 AND categoriesID = ?", [entryData.categoriesID], (err, data) => {
                if (err) return res.status(500).json(err);
                const totalPage = parseInt(data[0]) / limit;
                if (page > totalPage) page = totalPage;
                // all things
                db.query("SELECT * FROM product LEFT NATURAL JOIN categories WHERE status = 1 AND categoriesID = ? LIMIT ? OFFSET ?", [entryData.categoriesID, limit, (page - 1) * limit], (err, data) => {
                    if (err) return res.status(500).json(err);
                    const package = {
                        totalPage: totalPage,
                        page: page,
                        data: data
                    }
                    const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.partOfkey), package);
                    return res.status(200).json(encryptedData);
                });
            });
        }       
    }
    static getProductDetail(req, res) {
        const entryData = req.data.entry;        
        if (entryData.productID == null) return res.status(400).json("Not found Product (no ID)");
        if (entryData.versionDate == null){
            // get up to date
            // get current active product
            db.query("SELECT * FROM product WHERE productID = ? AND status = 1", [entryData.productID], (err, data) => {
                if (err) return res.status(500).json(err);
                if (data.length) return res.status(401).json("Product Not found or removed");                
                const currentVersion = data[0].versionDate;
                db.query("SELECT * FROM product LEFT NATURAL JOIN categories WHERE productID = ? AND versionDate = ?", [entryData.productID, currentVersion], (err, data) => {
                    if (err) return res.status(500).json(err);                    
                    const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.partOfkey), data);
                    return res.status(200).json(encryptedData);
                });
            });
        }
        else{
            // get something in the past
            db.query("SELECT * FROM product LEFT NATURAL JOIN categories WHERE productID = ? AND versionDate = ?", [entryData.productID, entryData.versionDate], (err, data) => {
                if (err) return res.status(500).json(err);
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.partOfkey), data);
                return res.status(200).json(encryptedData);
            });
        }
      
    }

}