import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./Prices.scss";
function Prices() {
    const [price, setPrice] = useState([]);
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/");

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data);
            setPrice(data);
        };
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div style={{ paddingTop: "100px" }}>
            <Container>
                <h2>Top {price.length} tiền ảo trên thị trường</h2>

                <Row>
                    <table className="table crypto-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                            </tr>
                        </thead>
                        {price.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>
                                        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/bitcoincash_bch_bitcoin-128.png" alt="loi"/>
                                        <span class="text-warning">
                                            {" "}
                                            Bitcoin
                                        </span>
                                    </td>
                                    <td>{item.cointype}</td>
                                    <td>{item.value}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </Row>
            </Container>
        </div>
    );
}

export default Prices;
