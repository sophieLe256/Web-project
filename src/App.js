import React from "react";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Header } from "./component/header";
import { Footer } from "./component/footer";
import { Body } from "./component/body";
// import { Carousel } from "react-bootstrap";
// import 'react-multi-carousel/lib/styless.css';

function App() {
  return (
    <>
      <Header />
      <Body>
        <Router>
          <div>
            <ul className="menu-list">
              <li><Link to="/">Best Seller</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/t-shirts">T-Shirts</Link></li>
              <li><Link to="/jackets">Jackets</Link></li>
              <li><Link to="/pants">Pants</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/outlet-sale">Outlet Sale</Link></li>
            </ul>
          </div>
        </Router>
      </Body>
      <Footer />
    </>
  );
}
export default App;

