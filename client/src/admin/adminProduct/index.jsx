import React, { useState, useEffect } from 'react';
import Sidebar from '../adminLayout/SideBar';
import Navbar from '../adminLayout/NavBar';
import "./adminProduct.css";
import { endPoint } from '../../api/clientAPI';
import ClientAPI from "../../api/clientAPI";
import MySecurity from "../../api/mySecurity";


export const AdminProduct = () => {

    const productsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [productData, setProductData] = useState(null);
    const [categoriesData, setCategoriesData] = useState(null);
    const [inputValues, setInputValues] = useState({ categoriesID: 1});
    const [resfresh, setResfresh] = useState(1.2);

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        // add new product
        try {
            let data = {
                ...inputValues,
                size: selectedSizes.join(",").toString(),
                image: ""
            }
            await ClientAPI.post("addProduct", data, image);
            //console.log("From AdminAddProductLayout.jsx: ", respond.data);  
            alert("Added Product")
            setResfresh(Math.random)
            setCurrentPage(1)

        }
        catch (error) {
            //console.log("From AdminAddProductLayout.jsx: ", err);
            console.error("Error:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert("Error in Add Product. Status Code: " + error.response.status);
            } else {
                alert("Error in Add Product", error.message)
            }
        }
        closeModal();
    };
    // remove product
    const removeProduct = async(event ,productID) => {
        event.preventDefault();
        // remove product
        try {
            const data = {
                productID: productID,
            }
            await ClientAPI.post("removeProduct", data, image);
            //console.log("From AdminRemoveProductLayout.jsx: ", respond.data);       
            alert("Deleted Product")
            setResfresh(Math.random())

        }
        catch (err) {
            //console.log("From AdminRemoveProductLayout.jsx: ", err);
            alert("Error in Delete Product: ",err)
        }
    }

    // open add product pop-up
    useEffect(() => {
        const modalForm = document.getElementById("addModal");

        if (modalForm) {
            if (isModalOpen) {
                modalForm.style.display = "block";
            } else {
                modalForm.style.display = "none";
            }
        }
    }, [isModalOpen]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = {
                    page: currentPage,
                    limit: productsPerPage,
                };
                // Get Categoris list
                const respond1 = await ClientAPI.post("getCategories", data);
                //console.log("From AdminProductCategories.jsx: ", respond1.data);
                setCategoriesData(MySecurity.decryptedData(respond1.data));
                // get product 
                const respond2 = await ClientAPI.post("getProduct", data);
                //console.log("From AdminProduct.jsx: ", respond2.data);
                setProductData(MySecurity.decryptedData(respond2.data));
                if (respond2.data.page !== currentPage)
                    setCurrentPage(respond2.data.page);
            }
            catch (err) {
                //console.log("From AdminProduct.jsx: ", err);
            }
        }
        fetchData();
    }, [currentPage, resfresh]);

    return (
        <section id="content" className='adminPage'>
            <Sidebar />
            <Navbar />
            {(categoriesData !== null && categoriesData !== undefined && productData !== null && productData !== undefined) ? (
                <main className="content-main-product">
                    <div className="head-title">
                        <div className="adminLeft">
                            <h1>Products</h1>
                            <ul className="breadcrumb">
                                <li>
                                    <a href="#">Products</a>
                                </li>
                                <li><i className='bx bx-chevron-right' ></i></li>
                                <li>
                                    <a className="active" href="#">Home</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <table id="items-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Size</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productData.data.map((item) => (
                                <tr key={item.productID}>
                                    <td>
                                        <a href={`products-details/${item.productID}`}>
                                            <img src={endPoint + item.image} alt="Product Image" />
                                        </a>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${parseFloat(item.price).toFixed(2)}</td>
                                    <td>{item.type}</td>
                                    <td>{item.size}</td>
                                    <td>
                                        <div>
                                            <a className="edit" role="button" href={`adminUpdateProduct/${item.productID}`}>
                                                Edit
                                            </a>
                                        </div>
                                        <form method="post" action="">
                                            <button className="delete" name="deleteProduct" value={item.productID} onClick={(e) => removeProduct(e,item.productID)}>
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button id="add-btn" onClick={openModal}>
                        Add Item
                    </button>

                    {isModalOpen && (
                        <div id="addModal" className="modal-form">
                            <div id="popup-form" className="popup">
                                <h2 style={{ textAlign: 'center', color: '#3C91E6' }}>Add New Item</h2>
                                <form onSubmit={handleAddProduct} encType="multipart/form-data">
                                    <label htmlFor="categoriesID">Categories:</label>
                                    <select id="categoriesID" name="categoriesID" onChange={handleInputChange}>
                                        {
                                            categoriesData.map((row) => (
                                                <option value={row.categoriesID}>{row.type}</option>
                                            ))
                                        }
                                    </select><br />

                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id="name" name="name" onChange={handleInputChange} /><br />

                                    <label htmlFor="price">Price:</label>
                                    <input type="text" id="price" name="price" onChange={handleInputChange} /><br /><br />

                                    <label htmlFor="image">Image:</label><br />
                                    <input type="file" name="image" onChange={handleImageChange} /><br /><br />

                                    <label htmlFor="size">Size:</label>
                                    <div className="checkbox-group" id="size">
                                        {/* Replace with your actual data source */}
                                        {['XS', 'S', 'M', 'L', 'XL'].map((name, index) => (
                                            <React.Fragment key={index}>
                                                <input
                                                    type="checkbox"
                                                    id={name}
                                                    name="size[]"
                                                    value={name}
                                                    checked={selectedSizes.includes(name)}
                                                    onChange={handleSizeChange}
                                                />
                                                <label htmlFor={name}>{name}</label>
                                            </React.Fragment>
                                        ))}
                                    </div><br />

                                    <label htmlFor="features">Features:</label>
                                    <textarea id="features" name="features" onChange={handleInputChange}></textarea><br />

                                    <button id="close-btn" type="button" onClick={closeModal}>
                                        Close
                                    </button>
                                    <button type="submit" name="addProduct">
                                        Add Item
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="pagination">
                        {Array.from({ length: productData.totalPage }).map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                </main>
            ) : (
                <main className="content-main-product">
                    <div className="head-title">
                        <div className="adminLeft">
                            <h1>Products</h1>
                            <p>Loading...</p>
                        </div>
                    </div>
                </main>
            )}
        </section>
    );
};
