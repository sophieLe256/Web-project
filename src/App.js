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
// import { Tshirts } from "./pages/t-shirts";
// import { Jackets } from "./pages/jackets";
// import { Pants } from "./pages/pants";
// import { Accessories } from "./pages/accessories";
// import { OutletSale } from "./pages/outlet-sale";
import { Description } from "./component/description";
import { CommonLayout } from "./layouts/CommonLayout";
import { Body } from "./component/body";
import { ProductLayout } from "./layouts/ProductLayout";

const router = createBrowserRouter([
  {
    path: "/",
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
        path: "products-details",
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
        path: "checkout",
        element: <CheckOut />,
      },

      {
        path: "products",
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <Products />,
          },

          // {
          //   path: "/t-shirts",
          //   element: <Tshirts />,
          // },
          // {
          //   path: "/jackets",
          //   element: <Jackets />,
          // },
          // {
          //   path: "/pants",
          //   element: <Pants />,
          // },
          // {
          //   path: "/accessories",
          //   element: <Accessories />,
          // },
          // {
          //   path: "/outlet-sale",
          //   element: <OutletSale />,
          // },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
