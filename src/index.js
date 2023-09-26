import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { AboutUs } from "./pages/about-us";
import { Products } from "./pages/products";
import { Tshirts } from "./pages/t-shirts";
import { Jackets } from "./pages/jackets";
import { Pants } from "./pages/pants";
import { Accessories } from "./pages/accessories";
import { OutletSale } from "./pages/outlet-sale";
import { Description } from "./component/description";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/description",
    element: <Description />,
  },
  {
    index: true,
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/t-shirts",
    element: <Tshirts />,
  },
  {
    path: "/jackets",
    element: <Jackets />,
  },
  {
    path: "/pants",
    element: <Pants />,
  },
  {
    path: "/accessories",
    element: <Accessories />,
  },
  {
    path: "/outlet-sale",
    element: <OutletSale />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App>

      </App>
    </BrowserRouter> */}
  </React.StrictMode>
);
