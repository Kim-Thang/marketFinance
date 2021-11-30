import React, { useEffect, useState } from "react";
import { Container, InputGroup, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Prices.scss";

function Prices() {
    const [price, setPrice] = useState([]);
    const [search, setSearch] = useState("");
    const [image, setImage] = useState([]);

    const history = useHistory();


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

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get('http://localhost:8000/coins/info')
            setImage(res.data)
        }
        fetchData();
    }, [])

     
    const handleNextPage = (id) => {
        history.push(`/prices/${id}`);
    };

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    };

    const filterCoin = price.filter((item) => {
        return item.typeCoin.toLowerCase().includes(search.toLowerCase());
    });


    filterCoin.forEach((item, index) => {
        image.forEach((img) => {
            if(index + 1 === img.ranked)
            item.image = img.icon
        })
    })

    return (
        <div style={{ paddingTop: "76px" }}>
            <div className="prices">
                <Container>
                    <Row className="justify-content-between align-items-center">
                        <div className="prices__title">
                            <h2>Top {price.length} tiền ảo trên thị trường</h2>
                        </div>
                        <div>
                            <form>
                                <input
                                    type="text"
                                    className="prices__search"
                                    placeholder="Search a cureency"
                                    value={search}
                                    onChange={handleOnChange}
                                />
                            </form>
                        </div>
                    </Row>

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
                            {filterCoin.map((item, index) => (
                                <tbody key={index}>
                                    <tr onClick={() => handleNextPage(item.id)}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:8000${item.image}`}
                                                alt="loi"
                                            />
                                        </td>
                                        <td>{item.typeCoin}</td>
                                        {
                                            item.status ? (<td className="green">{item.value}</td>) : (<td className="red">{item.value}</td>)
                                        }
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Prices;
