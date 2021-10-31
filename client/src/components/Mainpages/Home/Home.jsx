import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Home.scss";
function Home() {
    return (
        <div className="home">
            <div className="home__top">
                <Container>
                    <Row>
                        <Col lg={6} md={12}>
                            <div className="home__top-text">
                                <h2>
                                    A New Money <span>Cryptocurrency</span>
                                </h2>
                                <p>
                                    We can change life with the teach of new
                                    kind of money and use anywhere as our wish.
                                </p>
                                <p>
                                    Digital currency (digital money or
                                    electronic money or electronic currency) is
                                    a type of currency available only in digital
                                    form, not in physical (such as banknotes and
                                    coins). It exhibits properties similar to
                                    physical currencies, but allows for
                                    instantaneous transactions and borderless
                                    transfer-of-ownership. Examples include
                                    virtual currencies and cryptocurrencies or
                                    even central bank issued "digital base
                                    money".
                                </p>
                            </div>
                        </Col>
                        <Col lg={6} md={12}>
                            <div className="home__top-image">
                                <img
                                    src="http://html.kodesolution.live/f/cryptocoin/demo/images/about/2.png"
                                    alt="dolar"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="home__middle">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <div className="home__middle-text">
                                <h2>
                                    A New Kind of Digital Currency to change the
                                    world what we think
                                </h2>
                                <div className="home__middle-list">
                                    <ul>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>
                                                Faster, cheaper bank transfers
                                            </span>
                                        </li>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>
                                                A boost to global remittances
                                            </span>
                                        </li>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>Safe money for the poor</span>
                                        </li>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>
                                                Unleashing the potential of
                                                e-commerce
                                            </span>
                                        </li>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>
                                                Programmable money and smart
                                                contracts
                                            </span>
                                        </li>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>A boost to e-commerce</span>
                                        </li>
                                        <li>
                                            <i class="fas fa-chevron-circle-right"></i>
                                            <span>
                                                More money available for lics
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="home__midlle-image">
                                <img
                                    src="https://preview.hasthemes.com/dgtaka-v1/images/slider/1.png"
                                    alt="bitcoin-graph"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="home__bottom">
                <Container fluid>
                    <Row>
                        <Col lg={2} md={6}>
                            <div className="home__bottom-ticket">
                                <h6>Bitcoin - BTC</h6>
                                <span>60,391.72</span>
                                <p>1 BTC = 60,391.72 USD</p>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="home__bottom-ticket">
                                <h6>Ethernet - ETH</h6>
                                <span>4,204.83</span>
                                <p>1 ETH = 4,204.83 USD</p>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="home__bottom-ticket">
                                <h6>Tether - USDT</h6>
                                <span>1.00</span>
                                <p>1 USDT = 1.00 USD</p>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="home__bottom-ticket">
                                <h6>Cardano - ADA</h6>
                                <span>1.95</span>
                                <p>1 ADA = 1.95 USD</p>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="home__bottom-ticket">
                                <h6>Solana - SOL</h6>
                                <span>197.000</span>
                                <p>1 SOL = 197.000 USD</p>
                            </div>
                        </Col>
                        <Col lg={2} md={6}>
                            <div className="home__bottom-ticket none">
                                <h6>Polkadot - DOT</h6>
                                <span>41.86</span>
                                <p>1 DOT = 41.86 USD</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;
