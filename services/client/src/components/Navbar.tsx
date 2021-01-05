import React, { useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import CustomLink from "./Link";

const Navbar: React.FC = () => {
  const location = useLocation();

  const lineRef = useRef<HTMLDivElement>(null);

  const navbarRef = useRef<HTMLDivElement>(null);

  const handleActiveLine = useCallback((): void => {
    if (navbarRef && navbarRef.current && lineRef && lineRef.current) {
      const activeNavbarLink = navbarRef.current.querySelector<HTMLElement>(
        ".tdp-navbar__item.active"
      );

      if (activeNavbarLink) {
        lineRef.current.style.left = `${activeNavbarLink.offsetLeft}px`;
        lineRef.current.style.width = `${activeNavbarLink.offsetWidth}px`;
      } else {
        lineRef.current.style.left = `0px`;
        lineRef.current.style.width = `0px`;
      }
    }
  }, []);

  useEffect(() => {
    handleActiveLine();
  }, [location, handleActiveLine]);

  return (
    <>
      <div className="tdp-navbar-content shadow">
        <div ref={navbarRef} className="tdp-navbar">
          <div className="tdp-navbar__left">
            <p>Todo+</p>
            <CustomLink onActive={handleActiveLine} to="/">
              About
            </CustomLink>
            <CustomLink onActive={handleActiveLine} to="/login">
              Login
            </CustomLink>
          </div>
          <div className="tdp-navbar__right">
            <button
              type="button"
              className="tdp-button tdp-button--primary tdp-button--border"
            >
              <div className="tdp-button__content">
                <Link to="/register">Register</Link>
              </div>
            </button>
            <button
              type="button"
              className="tdp-button tdp-button--primary tdp-button--default"
            >
              <div className="tdp-button__content">
                <Link to="/login">Login</Link>
              </div>
            </button>
          </div>
          <div ref={lineRef} className="tdp-navbar__line" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
