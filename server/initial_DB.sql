USE `badrabbit`;
CREATE TABLE `card`
(
  `cardID` INT AUTO_INCREMENT,
  `acc_name` VARCHAR(50),
  `acc_number` VARCHAR(50),
  `expireDate` VARCHAR(10),
  `cvc` VARCHAR(5),
  `type` VARCHAR(50),
  `timeStamp` VARCHAR(100),
  PRIMARY KEY (`cardID`)
);

CREATE TABLE `user`
(
  `userID` INT AUTO_INCREMENT,
  `fullName` VARCHAR(100),
  `email` VARCHAR(100),
  `password` VARCHAR(255),
  `isAdmin` INT,
  PRIMARY KEY (`userID`)
);

CREATE TABLE `userToken`
(
  `tokenKey` VARCHAR(255),
  `createdDate` VARCHAR(100),
  `userID` INT,
  PRIMARY KEY (`tokenKey`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

CREATE TABLE `categories`
(
  `categoriesID` INT AUTO_INCREMENT,
  type VARCHAR(100),
  PRIMARY KEY (`categoriesID`)
);

CREATE TABLE `product`
(
  `productID` INT AUTO_INCREMENT,
  `versionDate` VARCHAR(100),
  `name` VARCHAR(255),
  `features` VARCHAR(255),
  `image` VARCHAR(255),
  `size` VARCHAR(100),
  `price` VARCHAR(10),
  `status` INT,
  `categoriesID` INT,
  PRIMARY KEY (`productID`, `versionDate`),
  FOREIGN KEY (`categoriesID`) REFERENCES `categories`(`categoriesID`)
);

CREATE TABLE `contact`
(
  `contactID` INT AUTO_INCREMENT,
  `name` VARCHAR(255),
  `email` VARCHAR(255),
  `address` VARCHAR(255),
  `city` VARCHAR(50),
  `zipcode` VARCHAR(10),
  `state` VARCHAR(10),
  `phone` VARCHAR(15),
  `timeStamp` VARCHAR(100),
  `userID` INT,
  PRIMARY KEY (`contactID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

CREATE TABLE `orders`
(
  `orderID` INT AUTO_INCREMENT,
  `transactionDate` VARCHAR(100),
  `totalPrice` VARCHAR(10),
  `note` VARCHAR(255),
  `status` INT,
  `contactID` INT,
  `cardID` INT,
  `userID` INT,
  PRIMARY KEY (`orderID`),
  FOREIGN KEY (`contactID`) REFERENCES `contact`(`contactID`),
  FOREIGN KEY (`cardID`) REFERENCES `card`(`cardID`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);

CREATE TABLE `orderItem`
(
  `orderItemID` INT AUTO_INCREMENT,
  `selectedSize` VARCHAR(10),
  `quantity` VARCHAR(3),
  `productID` INT,
  `versionDate` VARCHAR(100),
  `orderID` INT,
  PRIMARY KEY (`orderItemID`),
  FOREIGN KEY (`productID`) REFERENCES `product`(`productID`),
  FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`)
);


INSERT INTO `user` (`userID`, `fullName`, `email`, `password`, `isAdmin`) VALUES ('1', '0', '0', '0', '1');
INSERT INTO `contact` (`contactID`, `name`, `email`, `address`, `city`, `zipcode`, `state`, `phone`, `timeStamp`, `userID`) VALUES ('0', '0', '0', '0', '0', '0', '0', '0', '0', '1');
INSERT INTO `card` (`cardID`, `acc_name`, `acc_number`, `expireDate`, `cvc`, `type`, `timeStamp`) VALUES ('1', '0', '0', '0', '0', '0', '0');

INSERT INTO `user` (`fullName`, `email`, `password`, `isAdmin`) VALUES('admin','admin@gmail.com', '$2a$10$7lE8gY1uytxXtbUXFkX30unjimP7JCBIKPBdRushWEzyF4Qb6bZbq', '1');
INSERT INTO `categories` (type) VALUES
('T-Shirts'),
('Pants'),
('Accessories'),
('Jackets');
INSERT INTO `product`(`productID`, `versionDate`, `name`, `features`, `image`, `size`, `price`, `status`, `categoriesID`) VALUES 
(1,'0',"RABBIT POCKET SHIRT","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-1.webp","XS,S,M,L,XL",42,1,1),
(2,'0',"CREAM CARROT RABBIT SHORTS","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-2.webp","XS,M,XL",45,1,2),
(3,'0',"BLACK CARROT RABBIT SHORTS","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-3.webp","XS,L,XL",45,1,2),
(4,'0',"CREAM STRIPE RABBIT POLO","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-4.webp","XS,S,M",45,1,1),
(5,'0',"RABBIT IN THE BOX TEE","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-5.webp","XS,S,L,XL",45,1,1),
(6,'0',"HIDDEN RABBIT BACKPACK","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-6.jpg","XS,S,M,L,XL",70,1,3),
(7,'0',"CREAM STRIPE RABBIT POLO","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-7.jpg","XS,S,M",60,1,1),
(8,'0',"RABBIT IN THE BOX TEE","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-8.webp","XS,S,L,XL",20,1,4),
(9,'0',"HIDDEN RABBIT BACKPACK","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-9.jpg","XS,S,M,L,XL",30,1,2),
(10,'0',"RABBIT POCKET SHIRT","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-1.webp","XS,S,M,L,XL",42,1,1),
(11,'0',"CREAM CARROT RABBIT SHORTS","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-2.webp","XS,M,XL",45,1,2),
(12,'0',"BLACK CARROT RABBIT SHORTS","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-3.webp","XS,L,XL",45,1,2),
(13,'0',"CREAM STRIPE RABBIT POLO","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-4.webp","XS,S,M",45,1,1),
(14,'0',"RABBIT IN THE BOX TEE","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-5.webp","XS,S,L,XL",45,1,1),
(15,'0',"HIDDEN RABBIT BACKPACK","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-6.jpg","XS,S,M,L,XL",70,1,3),
(16,'0',"CREAM STRIPE RABBIT POLO","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-7.jpg","XS,S,M",60,1,1),
(17,'0',"RABBIT IN THE BOX TEE","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-8.webp","XS,S,L,XL",20,1,4),
(18,'0',"HIDDEN RABBIT BACKPACK","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-9.jpg","XS,S,M,L,XL",30,1,2),
(19,'0',"RABBIT POCKET SHIRT","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-1.webp","XS,S,M,L,XL",42,1,1),
(20,'0',"CREAM CARROT RABBIT SHORTS","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-2.webp","XS,M,XL",45,1,2),
(21,'0',"BLACK CARROT RABBIT SHORTS","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-3.webp","XS,L,XL",45,1,2),
(22,'0',"CREAM STRIPE RABBIT POLO","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-4.webp","XS,S,M",45,1,1),
(23,'0',"RABBIT IN THE BOX TEE","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-5.webp","XS,S,L,XL",45,1,1),
(24,'0',"HIDDEN RABBIT BACKPACK","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-6.jpg","XS,S,M,L,XL",70,1,3),
(25,'0',"CREAM STRIPE RABBIT POLO","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-7.jpg","XS,S,M",60,1,1),
(26,'0',"RABBIT IN THE BOX TEE","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-8.webp","XS,S,L,XL",20,1,4),
(27,'0',"HIDDEN RABBIT BACKPACK","Material: Comfortable and pleasant cotton \nGraphic: Print front and back \nTechnique: Full body printing,The shirt comes with a teddy bear in the front pocket","product-9.jpg","XS,S,M,L,XL",30,1,2);
