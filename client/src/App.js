import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Products } from "./pages/products";
import { Styles } from "./pages/styles";
import { ProductsDetails } from "./pages/products-details";
import { ShoppingCart } from "./pages/shopping-cart";
import { CheckOut } from "./pages/checkout";
import { Tshirts } from "./pages/t-shirts";
import { Jackets } from "./pages/jackets";
import { Pants } from "./pages/pants";
import { Accessories } from "./pages/accessories";
// import { OutletSale } from "./pages/outlet-sale";
import { OrderHistory } from "./pages/order-history";
import { OrderDetail } from "./pages/order-details";
import { Description } from "./component/description";
import { CommonLayout } from "./layouts/CommonLayout";
import { Body } from "./component/body";
import { ProductLayout } from "./layouts/ProductLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AdminDashboard } from './admin/adminDashboard';
import { AdminProduct } from './admin/adminProduct/index';
import { AdminUpdateProduct } from './admin/adminProduct/adminUpdateProduct';
import { AdminLogin } from './admin/adminLogin';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
    path: "",
    element: <CommonLayout />,
    children: [
      {
        index: true,
        path: "",
        element: <Body />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "products-details/:productId",
        element: <ProductsDetails />,
      },
      {
        path: "shopping-cart",
        element: <ShoppingCart />,
      },
      {
        path: "styles",
        element: <Styles />,
      },

      {
        path: "description",
        element: <Description />,
      },
      {
        path: "products",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },

        ],
      },
      {
        path: "t-shirts",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Tshirts />,
          },

        ],
      },
      {
        path: "jackets",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Jackets />,
          },

        ],
      },
      {
        path: "pants",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Pants />,
          },

        ],
      },
      {
        path: "accessories",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Accessories />,
          },

        ],
      },
      {
        path: "/auth",
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "order-details/:orderId",
        element: <OrderDetail />,
      },
    ],
  },
  {
    path: "checkout",
    element: <CheckOut />,
  },
  {
    path: "adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "adminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "adminProduct",
    element: <AdminProduct />,
  },
  {
    path: "adminUpdateProduct/:productId",
    element: <AdminUpdateProduct />,
  },
]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
