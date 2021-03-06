import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import axios from "axios";
import ChartPrice from "../../Pages/ChartPrice";
import { Alert, Col, Container, Row } from "react-bootstrap";
import InputField from "../Auth/InputField/InputField";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import "./PriceDetail.scss";

function PriceDetail() {
    const [historicData, setHistoricData] = useState([]);
    const [status, setStatus] = useState({ err: "", success: "" });
    const { err, success } = status;
    const [days, setDays] = useState("day");
    const { id } = useParams();

    // console.log(days)

    const isLogged = localStorage.getItem("firstLogin");
    const token = localStorage.getItem("userToken");
    const tokenBearer = `Bearer ${token}`;

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `http://localhost:8000/coins/${days}/${id}`
            );
            setHistoricData(res.data);
        };
        fetchData();
    }, [days]);


    const initialValues = {
        min_threshold: "",
        max_threshold: "",
        typecoin: id,
    };
    const validationSchema = Yup.object().shape({
        min_threshold: Yup.string().required("This filded is required."),
        max_threshold: Yup.string().required("This filded is required."),
        typecoin: Yup.string().required("This filded is required."),
    });

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

    const handleFavorite = async () => {
        const value = { coin: id };
        try {
            const res = await axios.post(
                "http://localhost:8000/users/favorite",
                value,
                {
                    headers: { Authorization: tokenBearer },
                }
            );
            alert('Add favoriter successfully')
        } catch (error) {
   
            alert('Add favoriter failed')
        }
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

    const handleSubcription = async (values, actions) => {
        try {
            const res = await axios.post(
                "http://localhost:8000/users/notification",
                values,
                {
                    headers: { Authorization: tokenBearer },
                }
            );
            setStatus({ err: "", success: res.data.message });
            actions.resetForm()
        } catch (error) {
            setStatus({ err: "", success: "" });
        }
    };
    return (
        <div className="price__detail" style={{ paddingTop: "100px" }}>
            {isLogged ? (
                <Container fluid>
                    <Row className="justify-content-between align-items-center mb-5">
                        <div className="price__detail-title">
                            <h2>{`Bi???u ????? gi??`}</h2>
                        </div>

                        <div>
                            {/* {success && (
                                <Alert variant="success">
                                   <Alert variant="success">{success}</Alert>
                                </Alert>
                            )}
                            {err && (
                                <Alert variant="danger">
                                   <Alert variant="danger">{err}</Alert>
                             
                                </Alert>
                            )} */}
                            <button
                                className="price__detail-like"
                                onClick={handleFavorite}
                            >
                                Like
                                <i className="fas fa-heart"></i>
                            </button>
                            <button
                                className="price__detail-btn"
                                onClick={handleDay}
                            >
                                1 days
                            </button>
                            <button
                                className="price__detail-btn"
                                onClick={handlekWeek}
                            >
                                7 days
                            </button>
                            <button
                                className="price__detail-btn"
                                onClick={handleMonth}
                            >
                                30 days
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <Col lg={9} md={12} sm={12}>
                            <Line data={data} />
                        </Col>
                        <Col lg={3} md={12} sm={12}>
                            {success && (
                                <Alert variant="success">{success}</Alert>
                            )}
                            <div className="notify">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, actions) =>
                                        handleSubcription(values, actions)
                                    }
                                >
                                    {(formikProps) => {
                                        const { values, errors, touched } =
                                            formikProps;
                                        return (
                                            <Form>
                                                <FastField
                                                    name="min_threshold"
                                                    component={InputField}
                                                    type="text"
                                                    label="Min Threshold"
                                                    placeholder=""
                                                />
                                                <FastField
                                                    name="max_threshold"
                                                    component={InputField}
                                                    type="text"
                                                    label="Max Threshold"
                                                    placeholder=""
                                                />
                                                <FastField
                                                    name="typecoin"
                                                    component={InputField}
                                                    type="text"
                                                    label="Type Coin"
                                                    placeholder=""
                                                />
                                                <button
                                                    className="btn-submit"
                                                    type="submit"
                                                >
                                                    Subcription
                                                </button>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Container>
                    <Row className="justify-content-between align-items-center mb-3">
                        <div className="price__detail-title">
                            <h2>Bi???u ????? gi??</h2>
                        </div>
                        <div>
                            <button
                                className="price__detail-btn"
                                onClick={handleDay}
                            >
                                1 days
                            </button>
                            <button
                                className="price__detail-btn"
                                onClick={handlekWeek}
                            >
                                7 days
                            </button>
                            <button
                                className="price__detail-btn"
                                onClick={handleMonth}
                            >
                                30 days
                            </button>
                        </div>
                    </Row>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <Line data={data} />
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    );
}

export default PriceDetail;
