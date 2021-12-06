import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import Notify from "../Notify/Notify";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.scss";

function Header() {
    const isLogged = localStorage.getItem("firstLogin");

    return (
        <Navbar expand="lg" bg="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="https://bootstrapwebtemplates.com/preview/Bitcoin-Trade/images/logo.png"
                        style={{ height: "50px" }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="navbarScroll"
                    style={{ backgroundColor: "#fff" }}
                />
                <Navbar.Collapse
                    id="navbarScroll"
                    className="justify-content-end"
                    bg="dark"
                >
                    <Nav>
                        <NavLink activeClassName="header-active" to="/prices">
                            <p className="header__link">PRICES</p>
                        </NavLink>
                        {isLogged ? (
                            <>
                                <Notify />
                                <Sidebar />
                            </>
                        ) : (
                            <>
                                <NavLink
                                    activeClassName="header-active"
                                    to="/signin"
                                >
                                    <p className="header__link">SIGN IN</p>
                                </NavLink>
                                <NavLink
                                    activeClassName="header-active"
                                    to="/signup"
                                >
                                    <p className="header__link">SIGN UP</p>
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
