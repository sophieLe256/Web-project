import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminProduct.css";
import { useNavigate } from "react-router-dom";
import { endPoint } from '../../api/clientAPI';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";

export const AdminUpdateProduct = () => {
    const [image, setImage] = useState('');
    const { productID } = useParams();    
    
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [inputValues, setInputValues] = useState({});
    const [categoriesData, setCategoriesData] = useState(null);

    const navigate = useNavigate();    
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Perform additional logic if needed
        setImage(file);
    };

    const handleSizeChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setSelectedSizes((prevSizes) => [...prevSizes, id]);
        } else {
            setSelectedSizes((prevSizes) => prevSizes.filter((size) => size !== id));
        }
        
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCancelEdit = (event) => {
        event.preventDefault();
        // Add logic to handle cancel edit
        navigate("/adminProduct");
    };

    // update product
    const handleEditProduct = async (event) => {
        event.preventDefault();
        
        try {         
            let data = {
                ...inputValues,
                size: selectedSizes.join(",").toString(),
            }
            const respond = await ClientAPI.post("updateProduct", data, image);
            console.log("From AdminUpdateProductLayout.jsx: ", respond.data);            
            navigate("/adminProduct");
        }
        catch (err) {
            console.log("From AdminUpdateProductLayout.jsx: ", err);
        }
    };

    // get inital product detail
    useEffect(() => {
        // Add logic to fetch product details using productID and update state variables
        async function fetchData() {
        try {

            // Get Categoris list
            const data = {
                productID: productID,
            };
            const respond1 = await ClientAPI.post("getCategories", data);
            console.log("From AdminProductCategories.jsx: ", respond1.data);
            setCategoriesData(MySecurity.decryptedData(respond1.data));
            // get product information
            
            const respond2 = await ClientAPI.post("getProductDetail", data);
            console.log("From AdminGetEditProduct.jsx: ", respond2.data);
            let productData = MySecurity.decryptedData(respond2.data);
            setInputValues({
                productID: productID,
                name: productData.name,
                features: productData.features,
                image: productData.image,
                categoriesID: productData.categoriesID,
                size: productData.size,
                price: productData.price
            });
            setSelectedSizes(productData.size.split(","));
        }
        catch (err) {
            console.log("From AdminGetEditProduct.jsx: ", err);
        }  
    }
    fetchData();
    }, []);
    
    if (categoriesData === null || categoriesData === undefined) {
        return (
            <section id="content" className='adminPage'> 
            <div className="loading">
                <p>Loading...</p>
            </div>
            </section>
        );
    }
    return (
        <section id="content" className='adminPage'>            
            <Sidebar />
            <Navbar />
            <main>
                <div className="head-title">
                    <div className="adminLeft">
                        <h1>Edit Product</h1>
                    </div>
                </div>
                <div className="updateProduct">
                    <form onSubmit={handleEditProduct} encType="multipart/form-data">
                        <label htmlFor="categoriesID">Categories:</label>
                        <select id="categoriesID" name="categoriesID" value={inputValues.categoriesID} onChange={handleInputChange}>
                            {
                                categoriesData.map((row) => (
                                    <option value={row.categoriesID}>{row.type}</option>
                                ))
                            }
                        </select><br />

                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={inputValues.name} onChange={handleInputChange} /><br />

                        <label htmlFor="price">Price:</label>
                        <input type="text" name="price" value={inputValues.price} onChange={handleInputChange} /><br /><br />

                        <img src={endPoint + inputValues.image} alt="Product Image" width="200" /><br />
                        <label htmlFor="image">Image URL:</label><br />
                        <input type="file" name="image" onChange={handleImageChange} /><br /><br />

                        <label htmlFor="size">Size:</label>
                        <div className="checkbox-group" id="size">
                            {['XS', 'S', 'M', 'L', 'XL'].map((name, index) => (
                                <React.Fragment key={index}>
                                    <input
                                        type="checkbox"
                                        id={name}
                                        name="size[]"
                                        value={name}
                                        onChange={handleSizeChange}
                                    />
                                    <label htmlFor={name}>{name}</label>
                                </React.Fragment>
                            ))}
                        </div><br />

                        <label htmlFor="features">Features:</label>
                        <textarea name="features" value={inputValues.features} onChange={handleInputChange}></textarea><br />

                        <button type="button" name="cancelEditProduct"  onClick={handleCancelEdit} style={{ marginRight: '10px' }} >Cancel</button>
                        <button type="submit" name="editProduct">Edit Item</button>
                    </form>
                </div>
            </main>
        </section>
    );
};

