import { db } from "../db.js"
import MySecurity from "./myServerSecurity.js";

{/*
Using Table: 
product(productID, versionDate, name, features, image, size, price, categoriesID, status)
order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
contact(contactID, name, email, address, city, zipcode, state, phone, userID, timeStamp)
user(userID, email, password, isAdmin)

Function:
// cart section
addCart()
getCart()
updateCartItem()
// payment section
checkOutCart()
getContact()
removeContact()
addcard() -- use for store transation only
// Ordered section
getOrderHistory()
getOrderHistoryDeatail()
updateOrderStatus()

Behavior:
+ addCart:
    + Create a new orderID or add more product to orderItems
+ getCart: 
    + collect all orders Item and send back
+ updateCartItem:
    + inscrease, descrease, or delete a cart item quantity/
+ checkOutCart:
    + save check out information.
+ getContact:
    + use for autofill shipping address
+ removeContact:
    + use to remove remmember address (not develop)
+ addcard:
    + use to store card information for transaction. (autofill.. not yet)
+ getOrderHistory:
    + show all orders already check out of user
+ getOrderHistoryDeatail
    + showw all information of Order: shipping, card, items.
+ updateOrderStatus:
    + change status by Admin: status = { 0: ShoppingCart, 1: Processing , 2: Shipped, 2: Deliveried, 3: Cancelled}

Package Struct:
req_encrypted.body = {
    key: key,
    data: encryptedData={
        userID: userID, //verify when decrypted data
        action: action, // use for swtich
        entry: data // json data from client
    }
}
addCart_data = {    
    productID: productID,     
    selectedSize: selectedSize
}
updateCartItem_data = {
    orderItemID: orderItemID,
    quantity: quantity
}
checkOutCart_data = {
    acc_name, acc_number, expireDate, cvc, type,
    address, city, zipcode, state, phone, userID, isDefault
}
getOrderHistoryDeatail = {
    orderID: orderID
}
updateOrderStatus = {
    orderID: orderID
}

Good luck, Ac Nhon.
*/}
export default class Orders {
    // Cart Section
    static addCart(inputD, res) {
        try {
            let entryData = inputD.entry;
            const currentDate = new Date();
            // finding open orders slot
            db.execute(`SELECT * FROM orders WHERE status = 0 AND userID = ${inputD.userID}`, (err, data1) => {
                if (err) return res.json(err);
                if (data1.length === 0) {
                    // need create new orders -- empty cart

                    const createOrderQuery = `INSERT INTO orders(transactionDate, totalPrice, note, cardID, userID, contactID, status ) VALUES ('${currentDate}','0','',1,${inputD.userID},1,0)`;
                    db.execute(createOrderQuery, (err, data2) => {
                        if (err) return res.status(401).json(err);
                        const orderID = data2.insertId;
                        const createOrderItemQuery = `INSERT INTO orderItem(orderID, productID, versionDate, selectedSize, quantity) VALUES (${orderID}, ${entryData.productID}, '', '${entryData.selectedSize}', '1')`;
                        db.execute(createOrderItemQuery, (err, data3) => {
                            if (err) return res.status(401).json(err);
                            return res.status(200).json("Add Cart Successful");
                        });
                    });
                }
                else {
                    // Cart is not empty
                    // Is product in cart yet ?
                    db.execute(`SELECT * FROM orderItem WHERE orderID = ${data1[0].orderID} AND productID = ${entryData.productID} AND selectedSize ='${entryData.selectedSize}'`, (err, data2) => {
                        if (err) return res.status(401).json(err);
                        if (data2.length === 0) {
                            // new Product to cart, quantity = 1
                            const createOrderItemQuery = `INSERT INTO orderItem(orderID, productID, versionDate, selectedSize, quantity) VALUES (${data1[0].orderID}, ${entryData.productID}, '', '${entryData.selectedSize}','1')`;
                            db.execute(createOrderItemQuery, (err, data) => {
                                if (err) return res.status(401).json(err);
                                return res.status(200).json("Add Cart Successful");
                            });
                        }
                        else {
                            // Item existed, quantity + 1
                            const updateOrderItemQuery = `UPDATE orderItem SET quantity= quantity+1 WHERE orderID = ${data1[0].orderID} AND productID = ${entryData.productID} AND selectedSize = '${entryData.selectedSize}'`;
                            db.execute(updateOrderItemQuery, (err, data3) => {
                                if (err) return res.status(401).json(err);
                                return res.status(200).json("Add Cart Successful");
                            });
                        }
                    });
                }
            });
        }
        catch (error) {
            return res.status(401).json("addCart fail. ", error);
        }
    }
    static updateCartItem(inputD, res) {
        try {
            let entryData = inputD.entry;
            if (entryData.quantity <= 0) {
                // item need to be remove.           
                db.execute(`DELETE FROM orderItem WHERE orderItemID = ${entryData.orderItemID}`, (err, data1) => {
                    if (err) return res.json(err);
                    return res.status(200).json("Removed");
                });
            } else {
                db.execute(`UPDATE orderItem SET quantity= '${entryData.quantity}' WHERE orderItemID = ${entryData.orderItemID}`, (err, data1) => {
                    if (err) return res.status(401).json(err);
                    return res.status(200).json("Update Cart Successful");
                });
            }

        }
        catch (error) {
            return res.status(200).json("updateCartItem fail. ", error);
        }

    }
    static async getCartItem(key, inputD, res) {
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status)
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        */
        try {
            const getOrderItemQuery =
                `SELECT I.orderItemID , I.selectedSize, I.quantity, I.productID , I.versionDate , I.orderID, P.name, P.image, P.price FROM orderItem as I INNER JOIN (SELECT * FROM product WHERE status = 1) AS P ON I.productID = P.productID WHERE orderID= (SELECT orderID FROM orders WHERE status = 0 and userID = ${inputD.userID})`
            db.execute(getOrderItemQuery, (err, data1) => {
                if (err) return res.status(401).json(err);
                if (data1.length === 0) return res.status(200).json(null);
                let packages = {
                    orderID: data1[0].orderID,
                    items: data1
                }
                // let return it in protected package
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), packages);
                return res.status(200).json(encryptedData);
            });
        }
        catch (error) {
            return res.status(401).json("getCartItem fail. ", error);
        }
    }
    static getNumberCartItem(inputD, res) {
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status)
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        */
        try {
            //console.log(inputD);
            const getNumberInCartQuery =
                `SELECT SUM(quantity) as number FROM orderItem WHERE orderID = (SELECT orderID FROM orders WHERE status = 0 and userID = ${inputD.userID})`
            db.execute(getNumberInCartQuery, (err, data1) => {
                if (err) return res.status(200).json(0);
                return res.status(200).json(data1[0].number);
            });
        }
        catch (error) {
            return res.status(200).json("getNumberCartItem fail. ", error);
        }
    }
    // Payment Section
    static async checkOutCart(inputD, res) {
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
        contact(contactID, email, name,  address, city, zipcode, state, phone, userID, timeStamp)
        */
        try {
            let entryData = inputD.entry;
            //console.log("inputD ", inputD);
            const currentDate = new Date();
            //await db2.beginTransaction();

            let contactID = "";
            let cardID = "";
            // add contact 
            const findContactQuery = `SELECT * FROM contact WHERE 
            name = '${entryData.name}' 
            AND email = '${entryData.email}'
            AND address = '${entryData.address}'
            AND city = '${entryData.city}'
            AND zipcode = '${entryData.zipcode}' 
            AND state ='${entryData.state}' 
            AND phone = '${entryData.phone}'             
            AND userID = ${inputD.userID};`;

            // query database
            db.execute(findContactQuery, (err, data1) => {
                // add contact 
                if (data1.length === 0) {
                    const createContactQuery = `INSERT INTO contact(name, email, address, city, zipcode, state, phone, userID, timeStamp) VALUES (?,?,?,?,?,?,?,${inputD.userID},?)`;
                    const value_new_contact = [
                        entryData.name,
                        entryData.email,
                        entryData.address,
                        entryData.city,
                        entryData.zipcode,
                        entryData.state,
                        entryData.phone,
                        currentDate
                    ];
                    db.execute(createContactQuery, value_new_contact, (err, data2) => {
                        contactID = data2.insertId;
                        // add card                     
                        const findCardQuery = `SELECT * FROM card WHERE 
                            acc_name = '${entryData.acc_name}' 
                            AND acc_number = '${entryData.acc_number}' 
                            AND expireDate = '${entryData.expireDate}' 
                            AND cvc = '${entryData.cvc}' 
                            AND type = '${entryData.type}'`;
                        db.execute(findCardQuery, (err, data3) => {
                            if (data3.length === 0) {
                                const createCardQuery = "INSERT INTO card(acc_name, acc_number, expireDate, cvc, type, timeStamp) VALUES (?,?,?,?,?,?)";
                                const value_new_card = [
                                    entryData.acc_name,
                                    entryData.acc_number,
                                    entryData.expireDate,
                                    entryData.cvc,
                                    entryData.type,
                                    currentDate
                                ]
                                db.execute(createCardQuery, value_new_card, (err, data4) => {
                                    cardID = data4.insertId;
                                    // update each item.
                                    const updateItemsQuery = `UPDATE orderItem as O SET O.versionDate = (SELECT versionDate FROM Product as P WHERE status = 1 AND P.productID = O.productID) WHERE orderID = ${entryData.orderID}`
                                    db.execute(updateItemsQuery, (err, data5) => {
                                        if (err) return res.status(401).json(err);
                                        // get total Price
                                        let totalPrice = 0;
                                        db.execute(`SELECT O.orderID, SUM(O.quantity * P.price) AS totalPrice FROM orderItem AS O, product AS P WHERE O.orderID = ${entryData.orderID} AND O.productID = P.productID GROUP BY O.orderID;`, (err, data6) => {
                                            if (err) return res.status(401).json(err);
                                            //console.log("data6[0].totalPrice = ", data6[0].totalPrice);
                                            totalPrice = data6[0].totalPrice;
                                            // update Order
                                            const checkoutOrderQuery = `UPDATE orders SET transactionDate = '${currentDate}', totalPrice = ${totalPrice},  note = '${entryData.note}', cardID = ${cardID},  contactID = ${contactID}, status = 1 WHERE orderID = ${entryData.orderID};`;
                                            db.execute(checkoutOrderQuery, (err, data7) => {
                                                if (err) return res.status(401).json(err);
                                                return res.status(200).json("Check-out successful");
                                            });

                                        });
                                    });
                                });
                            }
                            else {
                                cardID = data3[0].cardID;
                                // update each item.
                                const updateItemsQuery = "UPDATE orderItem as O SET O.versionDate = (SELECT versionDate FROM Product as P WHERE status = 1 AND P.productID = O.productID) WHERE orderID = ?"
                                db.execute(updateItemsQuery, [entryData.orderID], (err, data4) => {
                                    if (err) return res.status(401).json(err);

                                    //get total 
                                    let totalPrice = 0;
                                    db.execute(`SELECT O.orderID, SUM(O.quantity * P.price) AS totalPrice FROM orderItem AS O, product AS P WHERE O.orderID = ${entryData.orderID} AND O.productID = P.productID GROUP BY O.orderID;`, (err, data5) => {
                                        if (err) return res.status(401).json(err);
                                        //console.log("data5[0].totalPrice 2 = ", data5[0].totalPrice);
                                        totalPrice = data5[0].totalPrice;
                                        // update Order
                                        const checkoutOrderQuery = `UPDATE orders SET transactionDate = '${currentDate}', totalPrice = ${totalPrice},  note = '${entryData.note}', cardID = ${cardID},  contactID = ${contactID}, status = 1 WHERE orderID = ${entryData.orderID};`;
                                        db.execute(checkoutOrderQuery, (err, data6) => {
                                            if (err) return res.status(401).json(err);
                                            return res.status(200).json("Check-out successful");
                                        });
                                    });
                                });
                            }
                        });
                    });
                    // end add card
                }
                else {
                    // add contact 
                    contactID = data1[0].contactID;
                    // add card                     
                    const findCardQuery = `SELECT * FROM card WHERE acc_name = '${entryData.acc_name}' AND acc_number = '${entryData.acc_number}' AND expireDate = '${entryData.expireDate}'  AND cvc = '${entryData.cvc}' AND type = '${entryData.type}'`;
                    db.execute(findCardQuery, (err, data2) => {
                        if (data2.length === 0) {
                            const createCardQuery = "INSERT INTO card(acc_name, acc_number, expireDate, cvc, type, timeStamp) VALUES (?,?,?,?,?,?)";
                            const value_new_card = [
                                entryData.acc_name,
                                entryData.acc_number,
                                entryData.expireDate,
                                entryData.cvc,
                                entryData.type,
                                currentDate
                            ]
                            db.execute(createCardQuery, value_new_card, (err, data3) => {
                                cardID = data3.insertId;

                                // update each item.
                                const updateItemsQuery = "UPDATE orderItem as O SET O.versionDate = (SELECT versionDate FROM Product as P WHERE status = 1 AND P.productID = O.productID) WHERE orderID = ?"
                                db.execute(updateItemsQuery, [entryData.orderID], (err, data4) => {
                                    if (err) return res.status(401).json(err);

                                    // get total
                                    let totalPrice = 0;
                                    db.execute(`SELECT O.orderID, SUM(O.quantity * P.price) AS totalPrice FROM orderItem AS O, product AS P WHERE O.orderID = ${entryData.orderID} AND O.productID = P.productID GROUP BY O.orderID;`, (err, data5) => {
                                        if (err) return res.status(401).json(err);
                                        //console.log("data5[0].totalPrice = ", data5[0].totalPrice);
                                        totalPrice = data5[0].totalPrice;

                                        // update order                           
                                        const checkoutOrderQuery = `UPDATE orders SET transactionDate = '${currentDate}', totalPrice = ${totalPrice},  note = '${entryData.note}', cardID = ${cardID},  contactID = ${contactID}, status = 1 WHERE orderID = ${entryData.orderID};`;
                                        db.execute(checkoutOrderQuery, (err, data6) => {
                                            if (err) return res.status(401).json(err);
                                            return res.status(200).json("Check-out successful");
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            cardID = data2[0].cardID;
                            // update each item.
                            const updateItemsQuery = "UPDATE orderItem as O SET O.versionDate = (SELECT versionDate FROM Product as P WHERE status = 1 AND P.productID = O.productID) WHERE orderID = ?"
                            db.execute(updateItemsQuery, [entryData.orderID], (err, data3) => {
                                if (err) return res.status(401).json(err);
                                // get total
                                let totalPrice = 0;
                                db.execute("SELECT O.orderID, SUM(O.quantity * P.price) AS totalPrice FROM orderItem AS O, product AS P WHERE O.orderID = ${entryData.orderID} AND O.productID = P.productID GROUP BY O.orderID;", (err, data4) => {
                                    if (err) return res.status(401).json(err);
                                    //console.log("data4[0].totalPrice = ", data4[0].totalPrice);
                                    totalPrice = data4[0].totalPrice;
                                    // update order                        
                                    const checkoutOrderQuery = `UPDATE orders SET transactionDate = '${currentDate}', totalPrice = ${totalPrice},  note = '${entryData.note}', cardID = ${cardID},  contactID = ${contactID}, status = 1 WHERE orderID = ${entryData.orderID};`;
                                    db.execute(checkoutOrderQuery, (err, data5) => {
                                        if (err) return res.status(401).json(err);
                                        return res.status(200).json("Check-out successful");
                                    });
                                });
                            });
                        }
                    });
                    // end add card
                }
            });
        }
        catch (err) {
            return res.status(200).json("checkOutCart fail. ", error);
        }
    }
    static getContact(key, inputD, res) {
        try {
            db.execute(`SELECT * FROM contact WHERE userID = ${inputD.userID} ORDER BY timeStamp DESC`, (err, data1) => {
                if (err) return res.status(401).json(err);
                if (data1.length === 0) return res.status(200).json("");
                // let return it in protected package
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), data1[0]);
                return res.status(200).json(encryptedData);
            });
        }
        catch (err) {
            //console.log(err);
            return res.status(200).json("getContact fail. ", error);
        }
    }
    // Ordered Histroy Section
    static getOrderHistory(key, inputD, res) {
        try {
            db.execute(`SELECT * FROM orders NATURAL LEFT JOIN card WHERE status <> 0 and userID = ${inputD.userID}`, (err, data1) => {
                if (err) return res.status(401).json(err);
                // let return it in protected package
                const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), data1);
                return res.status(200).json(encryptedData);
            });
        }
        catch (err) {
            //console.log(err);
            return res.status(200).json("getOrderHistory fail. ", error);
        }
    }
    static async getOrderHistoryDeatail(key, inputD, res) {
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
        contact(contactID, name, email, address, city, zipcode, state, phone, userID, timeStamp)
        */
        try {
            let entryData = inputD.entry;
            //console.log("inputD= ", inputD);
            if (entryData.orderID === null) return res.status(401).json("Order not found");
            let orderPack = {
                order: {},
                items: {},
                card: {},
                contact: {},
            }
            db.execute(`SELECT * FROM orders WHERE orderID = ${entryData.orderID}`, (err, data1) => {
                if (err) return res.status(401).json(err);
                orderPack.order = data1[0];

                db.execute(`SELECT * FROM orderItem NATURAL LEFT JOIN product WHERE orderID = ${entryData.orderID}`, (err, data1) => {
                    if (err) return res.status(401).json(err);
                    orderPack.items = data1;

                    db.execute(`SELECT * FROM card WHERE cardID = ${orderPack.order.cardID}`, (err, data1) => {
                        if (err) return res.status(401).json(err);
                        orderPack.card = data1[0];

                        db.execute(`SELECT * FROM contact WHERE contactID = ${orderPack.order.contactID}`, (err, data1) => {
                            if (err) return res.status(401).json(err);
                            orderPack.contact = data1[0];

                            const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(key), orderPack);
                            return res.status(200).json(encryptedData);
                        });
                    });

                });

            });
        }
        catch (e) {
            return res.status(200).json("getOrderHistoryDeatail fail. ", error);
        }
    }
    static updateOrderStatus(inputD, res) {
        try {
            let entryData = inputD.entry;
            db.execute(`UPDATE orders SET status = ${entryData.status} WHERE orderID = ${entryData.orderID}`, (err, data1) => {
                if (err) return res.status(401).json(err);
                return res.status(200).json("Update Status Successful");
            });
        }
        catch (e) {
            return res.status(200).json("updateOrderStatus fail. ", error);
        }
    }
}