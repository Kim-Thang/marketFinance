import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.scss";
function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col lg={8} md={6} sm={12}>
                        <Row>
                            <Col lg={4}>
                                <h2 className="footer__title">about us</h2>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        Nguyễn Văn A
                                    </li>
                                    <li className="footer__item">
                                        Nguyễn Văn B
                                    </li>
                                    <li className="footer__item">
                                        Nguyễn Văn C
                                    </li>
                                </ul>
                            </Col>
                            <Col lg={4}>
                                <h2 className="footer__title">contact us</h2>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        TP Hồ Chí Minh
                                    </li>
                                    <li className="footer__item">
                                        032-xxx-xxx
                                    </li>
                                </ul>
                            </Col>
                            <Col lg={4}>
                                <h2 className="footer__title">Email</h2>
                                <ul className="footer__list">
                                    <li className="footer__item">
                                        NguyenVanA@gmail.com
                                    </li>
                                    <li className="footer__item">
                                        NguyenVanB@gmail.com
                                    </li>
                                    <li className="footer__item">
                                        NguyenVanC@gmail.com
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4} md={6} sm={12}>
                        <h2 className="footer__title">
                            subscribe to receive more infomation{" "}
                        </h2>
                        <form>
                            <input
                                type="text"
                                id="email"
                                placeholder="Please enter your email"
                                className="form-input"
                            />
                            <button className="btn-submit" type="submit">
                                Subscribe
                            </button>
                        </form>
                    </Col>
                </Row>
                <div className="footer__social">
                    <Link to="/">
                        <i className="fab fa-facebook"></i>
                    </Link>
                    <Link to="/">
                        <i className="fab fa-twitter"></i>
                    </Link>
                    <Link to="/">
                        <i className="fab fa-skype"></i>
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default Footer;
