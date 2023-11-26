import mysql from "mysql2/promise"

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "admin",
    database: "badrabbit"
}

export const db = mysql.createConnection(dbConfig)
/*
product(productID, versionDate, name, features, image, size, price, categoriesID, status)
categories(categoriesID, type)
order(orderID, transactionDate, totalPrice, note, cardID, userID, contactID, status )
orderItem(orderItemID, orderID, productID, versionDate, selectedSize, quantity)
card(cardID, acc_name, acc_number, expireDate, cvc, type, timeStamp)
contact(contactID, address, city, zipcode, state, phone, userID, timeStamp)
user(userID, email, password, isAdmin)
UserToken(userID,tokenKey,createdDate)
*/
export const checkDatabase = () => {
    const databaseName = dbConfig.database;
    // check if database exist
    db.query(`SHOW DATABASES LIKE '?'`, [databaseName], async (err, results) => {
        if (err) return console.error('Error checking database existence:', err);
        if (results.length > 0) {
            await db.query("SELECT COUNT(*) AS tableCount FROM information_schema.tables WHERE table_schema = '?'", [databaseName], async (err, results) => {
                if (err) return console.error('Error counting tables:', err);
                const tableCount = results[0].tableCount;
                if (tableCount < 8) {
                    await db.query("DROP DATABASE IF EXISTS '?'", [databaseName], (err, results) => {
                    });
                }
                else {
                    return console.log('Database maybe ok');
                }
            });
        } else {
            console.log('Database does not exist.');
            await db.query("CREATE DATABASE ?;", [databaseName], (err, results) => {
            });
        }
        createTables(databaseName);
        initialData(databaseName);

    });
}
const createTables = (dbName) => {
    const tablesQuery =
        `USE ?;
CREATE TABLE card
(
  cardID INT AUTO_INCREMENT,
  acc_name VARCHAR(50) ,
  acc_number VARCHAR(50) ,
  expireDate VARCHAR(10) ,
  cvc VARCHAR(5) ,
  type VARCHAR(50) ,
  timeStamp VARCHAR(100) ,
  PRIMARY KEY (cardID)
);

CREATE TABLE user
(
  userID INT AUTO_INCREMENT,
  email VARCHAR(100) ,
  password VARCHAR(255) ,
  isAdmin INT ,
  PRIMARY KEY (userID)
);

CREATE TABLE userToken
(
  tokenKey VARCHAR(255) ,
  createdDate VARCHAR(100) ,
  userID INT
  PRIMARY KEY (tokenKey),
  FOREIGN KEY (userID) REFERENCES user(userID)
);

CREATE TABLE categories
(
  categoriesID INT AUTO_INCREMENT,
  type VARCHAR(100) ,
  PRIMARY KEY (categoriesID)
);

CREATE TABLE product
(
  productID INT AUTO_INCREMENT,
  versionDate VARCHAR(100) ,
  name VARCHAR(255) ,
  features VARCHAR(255) ,
  image VARCHAR(255) ,
  size VARCHAR(100) ,
  price VARCHAR(10) ,
  status INT ,
  categoriesID INT ,
  PRIMARY KEY (productID, versionDate),
  FOREIGN KEY (categoriesID) REFERENCES categories(categoriesID)
);

CREATE TABLE contact
(
  contactID INT AUTO_INCREMENT,
  address VARCHAR(255) ,
  city VARCHAR(50) ,
  zipcode VARCHAR(10) ,
  state VARCHAR(10) ,
  phone VARCHAR(15) ,
  timeStamp VARCHAR(100) ,
  userID INT ,
  PRIMARY KEY (contactID),
  FOREIGN KEY (userID) REFERENCES user(userID)
);

CREATE TABLE order
(
  orderID INT AUTO_INCREMENT,
  transactionDate VARCHAR(100) ,
  totalPrice VARCHAR(10) ,
  note VARCHAR(255) ,
  status INT ,
  contactID INT ,
  cardID INT ,
  userID INT ,
  PRIMARY KEY (orderID),
  FOREIGN KEY (contactID) REFERENCES contact(contactID),
  FOREIGN KEY (cardID) REFERENCES card(cardID),
  FOREIGN KEY (userID) REFERENCES user(userID)
);

CREATE TABLE orderItem
(
  orderItemID INT AUTO_INCREMENT,
  selectedSize VARCHAR(10) ,
  quantity VARCHAR(3) ,
  productID INT ,
  versionDate VARCHAR(100) ,
  orderID INT ,
  PRIMARY KEY (orderItemID),
  FOREIGN KEY (productID) REFERENCES product(productID),
  FOREIGN KEY (orderID) REFERENCES order(orderID)
);`;
    db.query(tablesQuery, [dbName], (err, results) => {
        if (err) {
            console.error('Error counting tables:', err);
            return false;
        }
        console.log('Tables created');
        return true;
    });
}
const initialData = (dbName) => {
    const tablesQuery =
        `USE ?;
INSERT INTO user(userID, email, password, isAdmin) VALUES(1,admin,admin,1);
INSERT INTO categories(categoriesID, type) VALUES
(0,"T-Shirts"),
(1,"Pants"),
(2,"Accessories"),
(3,"Jackets");
`;

    let insertQuery = "INSERT INTO product(productID, versionDate, name, features, image, size, price, status, categoriesID) VALUES ";
    const DUMMY_DATA = [
        {
            id: 1,
            image: "product-1.webp",
            name: "RABBIT POCKET SHIRT",
            price: 42,
            categories: 0,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 2,
            image: "product-2.webp",
            name: "CREAM CARROT RABBIT SHORTS",
            price: 45,
            categories: 1,
            size: "XS,M,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 3,
            image: "product-3.webp",
            name: "BLACK CARROT RABBIT SHORTS",
            price: 45,
            categories: 1,
            size: "XS,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 4,
            image: "product-4.webp",
            name: "CREAM STRIPE RABBIT POLO",
            price: 45,
            categories: 0,
            size: "XS,S,M",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 5,
            image: "product-5.webp",
            name: "RABBIT IN THE BOX TEE",
            price: 45,
            categories: 0,
            size: "XS,S,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 6,
            image: "product-6.jpg",
            name: "HIDDEN RABBIT BACKPACK",
            price: 70,
            categories: 2,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 7,
            image: "product-7.jpg",
            name: "CREAM STRIPE RABBIT POLO",
            price: 60,
            categories: 0,
            size: "XS,S,M",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 8,
            image: "product-8.webp",
            name: "RABBIT IN THE BOX TEE",
            price: 20,
            categories: 3,
            size: "XS,S,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 9,
            image: "product-9.jpg",
            name: "HIDDEN RABBIT BACKPACK",
            price: 30,
            categories: 1,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 1,
            image: "product-1.webp",
            name: "RABBIT POCKET SHIRT",
            price: 42,
            categories: 0,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 2,
            image: "product-2.webp",
            name: "CREAM CARROT RABBIT SHORTS",
            price: 45,
            categories: 1,
            size: "XS,M,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 3,
            image: "product-3.webp",
            name: "BLACK CARROT RABBIT SHORTS",
            price: 45,
            categories: 1,
            size: "XS,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 4,
            image: "product-4.webp",
            name: "CREAM STRIPE RABBIT POLO",
            price: 45,
            categories: 0,
            size: "XS,S,M",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 5,
            image: "product-5.webp",
            name: "RABBIT IN THE BOX TEE",
            price: 45,
            categories: 0,
            size: "XS,S,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 6,
            image: "product-6.jpg",
            name: "HIDDEN RABBIT BACKPACK",
            price: 70,
            categories: 2,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 7,
            image: "product-7.jpg",
            name: "CREAM STRIPE RABBIT POLO",
            price: 60,
            categories: 0,
            size: "XS,S,M",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 8,
            image: "product-8.webp",
            name: "RABBIT IN THE BOX TEE",
            price: 20,
            categories: 3,
            size: "XS,S,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 9,
            image: "product-9.jpg",
            name: "HIDDEN RABBIT BACKPACK",
            price: 30,
            categories: 1,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 1,
            image: "product-1.webp",
            name: "RABBIT POCKET SHIRT",
            price: 42,
            categories: 0,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 2,
            image: "product-2.webp",
            name: "CREAM CARROT RABBIT SHORTS",
            price: 45,
            categories: 1,
            size: "XS,M,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 3,
            image: "product-3.webp",
            name: "BLACK CARROT RABBIT SHORTS",
            price: 45,
            categories: 1,
            size: "XS,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 4,
            image: "product-4.webp",
            name: "CREAM STRIPE RABBIT POLO",
            price: 45,
            categories: 0,
            size: "XS,S,M",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 5,
            image: "product-5.webp",
            name: "RABBIT IN THE BOX TEE",
            price: 45,
            categories: 0,
            size: "XS,S,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 6,
            image: "product-6.jpg",
            name: "HIDDEN RABBIT BACKPACK",
            price: 70,
            categories: 2,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 7,
            image: "product-7.jpg",
            name: "CREAM STRIPE RABBIT POLO",
            price: 60,
            categories: 0,
            size: "XS,S,M",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 8,
            image: "product-8.webp",
            name: "RABBIT IN THE BOX TEE",
            price: 20,
            categories: 3,
            size: "XS,S,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
        {
            id: 9,
            image: "product-9.jpg",
            name: "HIDDEN RABBIT BACKPACK",
            price: 30,
            categories: 1,
            size: "XS,S,M,L,XL",
            features: "Material: Comfortable and pleasant cotton,Graphic: Print front and back ,Technique: Full body printing,The shirt comes with a teddy bear in the front pocket"
        },
    ];
    //product(productID, versionDate, name, features, image, size, price, status, categoriesID)
    DUMMY_DATA.map((item) => {
        insertQuery = insertQuery + "(" + item.id + ",'0'," + item.name + "," + item.features + "," + item.image + "," + item.size + "," + item.price + ",1," + item.categories + "),";
    });
    insertQuery = insertQuery.substring(insertQuery.length - 1, 1) + ";";
    db.query(insertQuery, [dbName], (err, results) => {
        if (err) {
            console.error('Insert tables error:', err);
            return false;
        }
        console.log('Tables Inserted');
        return true;
    });
}