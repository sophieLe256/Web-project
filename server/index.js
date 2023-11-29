import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import Product from "./behavior/product.js";
import Orders from "./behavior/order.js";
import { checkDatabase } from "./db.js";
import multer from "multer";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import MySecurity from "./behavior/myServerSecurity.js";
import Authentication from "./behavior/authentication.js";
// Server port
var app = express()
const port = 3000

app.use(express.json())
app.use(cookieParser())
// Allow CORS
app.use(cors());
// check database
checkDatabase();

// read picture from disk
const getImageData = (folder, imageName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);    
    let imagePath = path.join(__dirname, folder, imageName);
    try {
        // Read the contents of the image file
        const imageData = fs.readFileSync(imagePath);
        return imageData;
    } catch (error) {        
        try{
            imagePath = path.join(__dirname, 'images', "not-found.png");
            const imageData2 = fs.readFileSync(imagePath);
            return imageData2;
        }
        catch(err){
            console.error('Error reading image file:', error);
        }
        return null;
    }
};
// get image from clients
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/'); // Set your destination folder
    },
    filename: function (req, file, cb) {
        const list = file.originalname.split('.');
        cb(null, `${Date.now()}.${list[list.length-1]}`); // Set your filename logic
    },
});
const upload = multer({storage: storage});
{/*
Swithcher rules: 
    + decrypted
    + switch by action
Package Struct:
req_encrypted={    
    body = {
        key: partOfKey,
        data: encryptedData={
            userID: userID, //verify when decrypted data
            action: action, // use for swtich
            entry: data // json data from client
        }
        file: imageUpload,
    }
}
res.sendout ={
    data: encryptedData, // client use tokenkey stored in local to decrypted it
    // not need send back to client partOfKey
}
*/}
// Switcher
app.post("/dummydata", upload.single('picture'), async (req, res) => {  
    if (req === null) return res.status(400).json("Bad Request");  
    
    let data = JSON.parse(req.body.data);
    let key = req.body.key;  
    switch (data.action) {
        // authentication
        case "login":
            Authentication.login(data, res);
            break;
        case "register":
            Authentication.register(data, res);
            break;
        case "logout":
            Authentication.logout(key, res);
            break;
        // product
        case "getProduct":
            Product.getProduct(key, data, res);
            break;
        case "getProductDetail":
            
            Product.getProductDetail(key, data, res);
            break;
        case "getNewestProduct":
            Product.getNewestProduct(key, data, res);
            break;           
        case "addProduct":
            // handle upload file
            if (req.file !== null && req.file != undefined) {
                data.entry.image = req.file.filename;
            }  
            Product.addProduct(data, res);
            break;        
        case "updateProduct":
            // handle upload file
            console.log(req);
            if (req.file !== null && req.file != undefined) {
                data.entry.image = req.file.filename;
            }            
            Product.updateProduct(data, res);
            break;
        case "removeProduct":
            Product.removeProduct(data, res);
            break;
        case "getCategories":
            Product.getCategories(key, res);
            break;
        // order
        case "addCart":
            Orders.addCart(data, res);
            break;
        case "getNumberCartItem":
            Orders.getNumberCartItem(data, res);
            break;
        case "getCartItem":
            Orders.getCartItem(key,data, res);
            break;
        case "updateCartItem":
            Orders.updateCartItem(data, res);
            break;
        case "checkOutCart":
            await Orders.checkOutCart(data, res);
            break;
        case "getContact":
            Orders.getContact(key, data, res);
            break;
        case "getOrderHistory":
            Orders.getOrderHistory(key, data, res);
            break;
        case "getOrderHistoryDeatail":
            Orders.getOrderHistoryDeatail(key, data, res);
            break;
        case "updateOrderStatus":
            Orders.updateOrderStatus(data, res);
            break;
        
        default:        
            res.status(400).json("Bad Request");
            break;
    }
})
app.get('/test/getCategories',(req,res)=>{
    Product.getCategories(req.body, res);
});

// send picture out
app.get('/dummydata/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imageData = getImageData('images',imageName);

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', imageData.length);

    // Send the image data as the response
    res.end(imageData);
});

app.get('/dummydata/default/:imageName', (req, res) => {
    //console.log(req.params)
    const imageName = req.params.imageName;
    const imageData = getImageData('default',imageName);

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Length', imageData.length);

    // Send the image data as the response
    res.end(imageData);
});

app.listen(port, ()=> {
    console.log(`app listening at http://localhost:${port}`)
})
