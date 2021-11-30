import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.scss";

function Header() {
    const [user, setUser] = useState([]);

    const isLogged = localStorage.getItem("firstLogin");
    const token = localStorage.getItem("userToken");
    const tokenBearer = `Bearer ${token}`;

    const handleLogout = () => {
            localStorage.removeItem('firstLogin');
			localStorage.removeItem('userToken');
			window.location.href = '/';
    }

    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get("http://localhost:8000/users/detail", {
                headers: { Authorization: tokenBearer },
            });
            setUser(res.data);
        };
        getInfo();
    }, []);

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
                            <div className="info__user d-flex align-items-center justify-content-center"> 
                                <Link to="#" className="info__user-avatar ">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png" alt="/" />
                                    &nbsp;
                                    <span className="info__user-name">
                                        <span>{user.username}</span>
                                        <i className="fas fa-angle-down"></i>
                                    </span>
                                </Link>
                                <ul className="info__user-dropdown">
                                    <li>
                                        <Link to="/detail" style={{color: '#fff'}}>Infomation</Link>
                                    </li>
                                    <li onClick={handleLogout}>
                                        Log out
                                    </li>
                                </ul>
                            </div>
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
