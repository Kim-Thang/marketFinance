import React from "react";
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
    const headerMenu = ["prices","sign up", "sign in"];

    return (
        <Navbar expand="lg" bg="dark" fixed="top" >
        <Container>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="https://bootstrapwebtemplates.com/preview/Bitcoin-Trade/images/logo.png"
                    style={{height: '50px'}}
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
                {headerMenu.map((item, index) => (
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <NavLink
                            activeClassName="header-active"
                            to={item.split(" ").join("")}
                        >
                            <p className="header__link">
                                {item.toLocaleUpperCase()}
                            </p>
                        </NavLink>
                    </Nav>
                ))}
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Header;
