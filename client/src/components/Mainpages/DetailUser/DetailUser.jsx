import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row,  Alert } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, FastField } from "formik";
import InputField from "../Auth/InputField/InputField";
import "./DetailUser.scss";

function DetailUser() {
    const [status, setStatus] = useState({ err: "", success: "" });
    const { err, success } = status;
    const [user, setUser] = useState([]);
    const [toggle, setToggle] = useState(1);

    const token = localStorage.getItem("userToken");
    const tokenBearer = `Bearer ${token}`;

    const initialValues = {
        password: "",
        currentpassword: "",
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Please enter at least 6 characters.")
            .required("Please enter this field."),
        currentpassword: Yup.string().required("Please enter this field."),
    });

    const toggleTab = (index) => {
        setToggle(index);
    };

    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get("http://localhost:8000/users/detail", {
                headers: { Authorization: tokenBearer },
            });
            setUser(res.data);
        };
        getInfo();
    }, []);

    const handleChangePassword = async (values, actions) => {
        const value = {};
        value.password = values.password;
        try {
            const res = await axios.put(
                "http://localhost:8000/users/detail",
                value,
                {
                    headers: { Authorization: tokenBearer },
                }
            );
            setStatus({ err: "", success: res.data.message });
            actions.resetForm();
        } catch (error) {
            setStatus({ err: "", success: "" });
        }
    };
    return (
        <div className="profile" style={{ paddingTop: "76px"  }}>
            <Container>
                <Row>
                    <Col lg={4} md={12} sm={12}>
                        <div className="profile__menu">
                            <button
                                className={
                                    toggle === 1 ? "tabs active-tabs" : "tabs"
                                }
                                onClick={() => toggleTab(1)}
                            >
                                <i className="fas fa-user"></i>
                                <span>Account information</span>
                            </button>
                            <button
                                className={
                                    toggle === 2 ? "tabs active-tabs" : "tabs"
                                }
                                onClick={() => toggleTab(2)}
                            >
                                <i className="fas fa-unlock"></i>
                                <span>Change password</span>
                            </button>
                        </div>
                    </Col>
                    <Col lg={8} md={12} sm={12}>
                        <div
                            className={toggle === 1 ? "active" : "tabs-content"}
                        >
                            <div className="profile__account">
                                <div className="profile__group d-flex">
                                    <label htmlFor="">User Name</label>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        disabled
                                        defaultValue={user.username}
                                    />
                                </div>
                                <div className="profile__group d-flex">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        disabled
                                        defaultValue={user.email}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={toggle === 2 ? "active" : "tabs-content"}
                        >
                            <div className="profile__account">
                                {success && (
                                    <Alert variant="success">{success}</Alert>
                                )}
                                <div className="form">
                                    <Formik
                                        initialValues={initialValues}
                                        validationSchema={validationSchema}
                                        onSubmit={(values, actions) =>
                                            handleChangePassword(
                                                values,
                                                actions
                                            )
                                        }
                                    >
                                        {(formikProps) => {
                                            const { values, errors, touched } =
                                                formikProps;
                                            return (
                                                <Form>
                                                    <FastField
                                                        name="currentpassword"
                                                        component={InputField}
                                                        type="password"
                                                        label="Current Password"
                                                        placeholder="Enter password"
                                                    />
                                                    <FastField
                                                        name="password"
                                                        component={InputField}
                                                        type="password"
                                                        label="Password"
                                                        placeholder="Enter password"
                                                    />
                                                    <button
                                                        className="btn-submit"
                                                        type="submit"
                                                    >
                                                        Update
                                                    </button>
                                                </Form>
                                            );
                                        }}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetailUser;
