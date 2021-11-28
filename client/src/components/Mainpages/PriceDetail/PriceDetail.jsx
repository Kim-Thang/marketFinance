import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import ChartPrice from "../../Pages/ChartPrice";
import { Container, Row } from "react-bootstrap";
import './PriceDetail.scss'

function PriceDetail() {
    const [historicData, setHistoricData] = useState([]);
    const [days, setDays] = useState("day");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `http://localhost:8000/coins/${days}/${id}`
            );
            setHistoricData(res.data);
        };
        fetchData();
    }, []);

    const data = {
        labels: historicData.map((item) => {
            let date = new Date(item.time);
            let time =
                date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === "day" ? time : date.toLocaleDateString();
        }),
        datasets: [
            {
                label: `Price ${days}`,
                data: historicData.map((item) => item.value),
                borderColor: "#EEBC1D",
            },
        ],
        options: {
            elements: {
                point: {
                    radius: 1,
                },
            },
            lineHeightAnnotation: {
                always: true,
                hover: false,
                lineWeight: 1.5,
            },
            animation: {
                duration: 2000,
            },
        },
    };

    const handleDay = () => {
        setDays("day");
    };
    const handlekWeek = () => {
        setDays("week");
    };
    const handleMonth = () => {
        setDays("month");
    };

    return (
        <div className="price__detail" style={{ paddingTop: "100px" }}>
            <Container>
                <Row className="justify-content-between align-items-center mb-3">
                    <div className="price__detail-title">
                        <h2>Biểu đồ giá</h2>
                    </div>
                    <div>
                        <button className='price__detail-btn' onClick={handleDay} >1 days</button>
                        <button className='price__detail-btn' onClick={handlekWeek}>7 days</button>
                        <button className='price__detail-btn' onClick={handleMonth}>30 days</button>
                    </div>
                </Row>
                <Row>
                    <Line data={data} />
                </Row>
            </Container>

        </div>
    );
}

export default PriceDetail;
