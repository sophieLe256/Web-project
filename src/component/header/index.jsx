import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import "./header.css";

export const Header = () => {
  return (
    <div className="header d-flex align-items-center">
      <img
        role="button"
        className="image-left"
        src="header_left.webp"
        alt="WebP rules."
      ></img>
      <img
        role="button"
        className="image-left"
        src="logo.webp"
        alt="WebP rules."
      ></img>
      <div className="right d-flex justify-content-around">
        <div className="hover-decor">
          <img
            role="button"
            className="image-right"
            src="header-icon-1.webp"
            alt="WebP rules."
          ></img>
        </div>
        <div className="hover-decor">
          <img
            role="button"
            className="image-right"
            src="header-icon-2.webp"
            alt="WebP rules."
          ></img>
        </div>
        <div className="hover-decor">
          <img
            role="button"
            className="image-right"
            src="header-icon-3.webp"
            alt="WebP rules."
          ></img>
        </div>
        <div className="hover-decor">
          <img
            role="button"
            className="image-right"
            src="header-icon-4.webp"
            alt="WebP rules."
          ></img>
        </div>
      </div>
    </div>
  );
};
