/* eslint-disable react/button-has-type */
import React from "react";
import { Link } from "react-router-dom";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="tdp-navbar-content shadow">
        <div className="tdp-navbar">
          <div className="tdp-navbar__left">
            <p>Todo+</p>
          </div>
          <div className="tdp-navbar__center">
            <div className="tdp-navbar__group">
              <button className="tdp-navbar__group__item">About</button>
            </div>
            <div className="tdp-navbar__group">
              <button className="tdp-navbar__group__item">Github</button>
            </div>
          </div>
          <div className="tdp-navbar__right">
            <button className="tdp-button tdp-button--primary tdp-button--border">
              <div className="tdp-button__content">
                <Link to="/register">Register</Link>
              </div>
            </button>
            <button className="tdp-button tdp-button--primary tdp-button--default">
              <div className="tdp-button__content">
                <Link to="/login">Login</Link>
              </div>
            </button>
          </div>
        </div>
      </div>
      <main className="page">{children}</main>
    </>
  );
};

export default Layout;
