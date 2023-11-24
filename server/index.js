import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import Product from "./behavior/product";
import Order from "./behavior/order";

// Server port
var app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
// Allow CORS
app.use(cors());

{/*
Swithcher rules: 
    + decrypted
    + switch by action
Package Struct:
req_encrypted.body = {
    key: partOfKey,
    data: encryptedData={
        userID: userID, //verify when decrypted data
        action: action, // use for swtich
        entry: data // json data from client
    }
}
res.sendout ={
    data: encryptedData, // client use tokenkey stored in local to decrypted it
    // not need send back to client partOfKey
}
*/}
// Switcher
app.post("/dummydata", (req_encode, res) => {
    const req = MySecurity.decryptedPackage(req_encode);
    if (req == null) return res.status(400).json("Bad Request");
    switch (req.body.data.entry.action) {
        // authentication
        case "login":
            Authentication.login(req.body.data.entry, res);
            break;
        case "register":
            Authentication.register(req.body.data.entry, res);
            break;
        case "logout":
            Authentication.logout(req.body, res);
            break;
        // product
        case "getProduct":
            Product.getProduct(req.body, res);
            break;
        case "getProductDetail":
            Product.getProductDetail(req.body, res);
            break;
        case "addProduct":
            Product.addProduct(req.body, res);
            break;
        case "removeProduct":
            Product.removeProduct(req.body, res);
            break;
        case "updateProduct":
            Product.updateProduct(req.body, res);
            break;
        case "getCategories":
            Product.getCategories(req.body, res);
            break;
        // order
        case "addCart":
            Order.addCart(req.body, res);
            break;
        case "getCartItem":
            Order.getCartItem(req.body, res);
            break;
        case "updateCartItem":
            Order.updateCartItem(req.body, res);
            break;
        case "checkOutCart":
            Order.checkOutCart(req.body, res);
            break;
        case "getContact":
            Order.getContact(req.body, res);
            break;
        case "getOrderHistory":
            Order.getOrderHistory(req.body, res);
            break;
        case "getOrderHistoryDeatail":
            Order.getOrderHistoryDeatail(req.body, res);
            break;
        case "updateOrderStatus":
            Order.updateOrderStatus(req.body, res);
            break;
        default:        
            res.status(400).json("Bad Request");
            break;
    }
})

app.listen(port, ()=> {
    console.log(`app listening at http://localhost:${port}`)
})
