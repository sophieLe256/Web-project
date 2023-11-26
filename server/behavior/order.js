import MySecurity from "./mySecurity";

{/*
Using Table: 
product(productID, versionDate, name, features, image, size, price, categoriesID, status)
order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
contact(contactID, address, city, zipcode, state, phone, userID, timeStamp)
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
    + Create a new OrderID or add more product to orderItems
+ getCart: 
    + collect all Order Item and send back
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
    + show all order already check out of user
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
export default class Order {
    // Cart Section
    static addCart(req, res) {
        const entryData = req.data.entry;
        // finding open Order slot
        db.query("SELECT * FROM order WHERE status = 0 AND userID = ?",[req.data.userID] ,(err, data) => {
            if (err) return res.json(err);
            if(data.length == 0){
                // need create new order -- empty cart
                const createOrderQuery = "INSERT INTO order(transactionDate, totalPrice, note, cardID, userID, contactID, status ) VALUES (?)";
                const currentDate = new Date();
                const values = [
                    currentDate,
                    0.0,
                    "",
                    -1,
                    req.data.userID,
                    -1,
                    0
                ];
                db.query(createOrderQuery, values, (err, data) => {
                    if (err) return res.status(401).json(err);
                    const orderId = data.insertId;
                    const createOrderItemQuery = "INSERT INTO orderItem(orderID, productID, versionDate, selectedSize, quantity) VALUES (?)";                    
                    const values = [
                        orderId,
                        encryptedData.productID,
                        "",
                        encryptedData.selectedSize,
                        1                        
                    ];
                    db.query(createOrderItemQuery, values, (err, data) => {
                        if (err) return res.status(401).json(err);
                        return res.status(200).json("Add Cart Successful");
                    });
                });
            }
            else{              
                // Cart is not empty
                // Is product in cart yet ?
                db.query("SELECT * FROM orderItem WHERE orderID = ? AND productID = ? AND selectedSize =?", [data[0].orderId,entryData.productID, encryptedData.selectedSize], (err, data) => {
                    if (err) return res.status(401).json(err);
                    if (data.length == 0) {
                        // new Product to cart, quantity = 1
                        const createOrderItemQuery = "INSERT INTO orderItem(orderID, productID, versionDate, selectedSize, quantity) VALUES (?)";
                        const values = [
                            data[0].orderId,
                            encryptedData.productID,
                            "",
                            encryptedData.selectedSize,
                            1
                        ];
                        db.query(createOrderItemQuery, values, (err, data) => {
                            if (err) return res.status(401).json(err);
                            return res.status(200).json("Add Cart Successful");
                        });
                    }
                    else{
                        // Item existed, quantity + 1
                        const updateOrderItemQuery = "UPDATE orderItem SET quantity= quantity+1 WHERE orderID = ? AND productID = ? AND selectedSize = ?";
                        const values = [
                            data[0].orderId,
                            encryptedData.productID,
                            encryptedData.selectedSize
                        ];
                        db.query(updateOrderItemQuery, values, (err, data) => {
                            if (err) return res.status(401).json(err);
                            return res.status(200).json("Add Cart Successful");
                        });
                    }
                });
            }        
        });
    }
    static updateCartItem(req, res) { 
        // need update quantity = 0 => delete        
        const entryData = req.data.entry;        
        db.query("SELECT * FROM orderItem WHERE orderItemID = ?", [entryData.orderItemID], (err, data) => {
            if (err) return res.json(err);
            if (entryData.quantity <= 0){
                // item need to be remove.
                if (data.length == 0) return res.status(200).json("Removed"); 
                db.query("DELETE FROM orderItem WHERE orderItemID = ?", [entryData.orderItemID], (err, data) => {
                    if (err) return res.json(err);
                    return res.status(200).json("Removed");
                });
            }
            else{
                // Is item in record
                if (data.length == 0){                  
                    return res.status(200).json("Not Found PRoduct in Cart?");
                }
                else{
                    db.query("UPDATE orderItem SET quantity= ? WHERE orderItemID = ?", [entryData.quantity, entryData.orderItemID], (err, data) => {
                        if (err) return res.status(401).json(err);
                        return res.status(200).json("Update Cart Successful");
                    });
                }
            }     
            
        });

    }
    static getCartItem(req, res) { 
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status)
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        */
        let orderID =null;
        db.query("SELECT orderID FROM order WHERE status = 0 and userID = ?", [req.data.userID], (err, data) => {
            if (err) return res.status(401).json(err);
            if(data.length) return;
            orderID = data[0].orderID;           
        });  
        if(orderID === null){
            // not thing in cart
            return res.status(200).json(null);
        }
        const getOrderItemQuery = 
        "SELECT * FROM orderItem as I INNER JOIN (SELECT * FROM product WHERE status = 1) AS P ON I.productID = P.productID"       
        db.query(getOrderItemQuery, [req.data.userID], (err, data) => {
            if (err) return res.status(401).json(err);
            let package ={
                orderID: orderID,
                items: data
            }
            // let return it in protected package
            const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.key), package);
            return res.status(200).json(encryptedData);
        });        
    }
    static getNumberCartItem(req, res) {
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status)
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        */
        let orderID = null;
        db.query("SELECT orderID FROM order WHERE status = 0 and userID = ?", [req.data.userID], (err, data) => {
            if (err) return res.status(401).json(err);
            if (data.length) return;
            orderID = data[0].orderID;
        });
        if (orderID === null) {
            // not thing in cart
            return res.status(200).json("0");
        }
        const getNumberInCartQuery =
            "SELECT COUNT(*) FROM orderItem WHERE orderID = ?)"
        db.query(getNumberInCartQuery, [orderID], (err, data) => {
            if (err) return res.status(401).json(err);
           return res.status(200).json(data[0]);
        });
    }
    // Payment Section
    static async checkOutCart(req, res) { 
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
        contact(contactID, email, name,  address, city, zipcode, state, phone, userID, timeStamp)
        */
        const entryData = req.data.entry;
        const currentDate = new Date();  
        await db.beginTransaction();        
        try {
            let contactID = "";
            let cardID = "";   
            // add contact 
            const findContactQuery = "SELECT * FROM contact WHERE address = ? AND city = ? AND zipcode = ? AND state = ? AND phone = ? AND userID = ?";
            const value_contact = [
                entryData.address, 
                entryData.city, 
                entryData.zipcode, 
                entryData.state, 
                entryData.phone, 
                req.data.userID
            ]
            await db.query(findContactQuery, value_contact, async (err, data) => {
                if (err) throw new Error(err);
                if (data.length) {
                    const createContactQuery = "INSERT INTO contact(address, city, zipcode, state, phone, userID, timeStamp) VALUES (?)";                    
                    const value_new_contact = [
                        entryData.address,
                        entryData.city,
                        entryData.zipcode,
                        entryData.state,
                        entryData.phone,
                        req.data.userID,
                        currentDate
                    ]
                    await db.query(createContactQuery, value_new_contact, (err, data) => {
                        if (err) throw new Error(err);
                        contactID = data.insertId;
                    });
                }
                else{
                    contactID = data[0].contactID;
                }
            });

            // add card           
            const findCardQuery = "SELECT * FROM card WHERE acc_name = ? AND acc_number = ? AND expireDate = ? AND cvc = ? AND type = ?";
            const value_card = [
                entryData.acc_name,
                entryData.acc_number,
                entryData.expireDate,
                entryData.cvc,
                entryData.type,
            ]
            await db.query(findCardQuery, value_card, async (err, data) => {
                if (err) throw new Error(err);
                if (data.length) {
                    const createCardQuery = "INSERT INTO card(acc_name, acc_number, expireDate, cvc, type, timeStamp) VALUES (?)";
                    const value_new_card = [
                        entryData.acc_name,
                        entryData.acc_number,
                        entryData.expireDate,
                        entryData.cvc,
                        entryData.type,
                        currentDate
                    ]
                    await db.query(createCardQuery, value_new_card, (err, data) => {
                        if (err) throw new Error(err);
                        cardID = data.insertId;
                    });
                }
                else {
                    cardID = data[0].cardID;
                }
            });

            // update each item.
            const updateItemsQuery = "(WITH SELECT productID, versionDate WHERE status = 1) AS Product UPDATE orderItem as O SET O.versionDate = Product.versionDate WHERE O.productID = Product.productID AND orderID = ?"
            await db.query(updateItemsQuery, [entryData.orderID], async (err, data) => {
                if (err) throw new Error(err);
            });
            // update order
            let totalPrice = 0;
            await db.query("SELECT orderID, SUM(quantity * price) AS totalPrice FROM orderItem LEFT NATURAL JOIN product WHERE orderID = ? GROUP BY orderID ", [entryData.orderID], async (err, data) => {
                if (err) throw new Error(err);
                totalPrice = data[0].totalPrice;
            });
            // order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
            const checkoutOrderQuery = "UPDATE order SET transactionDate = ?, totalPrice = ?, note = ?, cardID = ?, contactID =?, status = 1 WHERE orderID = ?";
            const value_checkout=[
                currentDate,
                totalPrice,
                entryData.note,
                cardID,
                contactID,
                entryData.orderID
            ]
            await db.query(checkoutOrderQuery, value_checkout, async (err, data) => {
                if (err) throw new Error(err);
            });
            
            // all ok, let commit
            await connection.commit();
            return res.status(200).json("Check Out Succesful.");
        }
        catch (error) {
            await connection.rollback();
            return res.status(200).json("Check Out Fail.");
        }

    }
    static getContact(req, res) {         
        db.query("SELECT * FROM contact WHERE userID = ? SORT BY DESC(timeStamp)", [req.data.userID], (err, data) => {
            if (err) return res.status(401).json(err);
            if (data.length) return res.status(200).json("");
            // let return it in protected package
            const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.key), data[0]);
            return res.status(200).json(encryptedData);
        });
    }
    // Ordered Histroy Section
    static getOrderHistory(req, res) { 
        db.query("SELECT * FROM order LEFT NATURAL JOIN card WHERE status <> 0 and userID = ?", [req.data.userID], (err, data) => {
            if (err) return res.status(401).json(err);            
            // let return it in protected package
            const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.key), data);
            return res.status(200).json(encryptedData);
        });
    }
    static async getOrderHistoryDeatail(req, res) { 
        /*
        product(productID, versionDate, name, features, image, size, price, categoriesID, status)
        order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
        orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
        card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
        contact(contactID, name, email, address, city, zipcode, state, phone, userID, timeStamp)
        */
        const entryData = req.data.entry;
        if (entryData.orderID == null) return res.status(401).json("Order not found");
        let orderPack ={
            order: {},
            items: {},
            card: {},
            contact: {},
        }
        await db.query("SELECT * FROM order WHERE orderID = ?", [entryData.orderID], (err, data) => {
            if (err) return res.status(401).json(err);
            orderPack.order = data[0];
        });
        await db.query("SELECT * FROM orderItem LEFT NATURAL JOIN product WHERE orderID = ?", [entryData.orderID], (err, data) => {
            if (err) return res.status(401).json(err);
            orderPack.items = data;
        });
        await db.query("SELECT cardID, acc_name, acc_number, expireDate, type FROM card WHERE cardID = ?", [orderPack.order.cardID], (err, data) => {
            if (err) return res.status(401).json(err);
            orderPack.card = data[0];
        });
        await db.query("SELECT contactID, address, city, zipcode, state, phone FROM card WHERE contactID = ?", [orderPack.order.contactID], (err, data) => {
            if (err) return res.status(401).json(err);
            orderPack.contact = data[0];
        });
        const encryptedData = MySecurity.encryptedData(MySecurity.getUserToken(req.key), orderPack);
        return res.status(200).json(encryptedData);
    }
    static updateOrderStatus(req, res) { 
        const entryData = req.data.entry;
        db.query("UPDATE order SET status = ? WHERE orderID = ?", [entryData.status,entryData.orderID], (err, data) => {
            if (err) return res.status(401).json(err);
            return res.status(200).json("Update Status Successful");
        });
    }
}