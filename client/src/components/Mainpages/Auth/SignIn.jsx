import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "./InputField/InputField";
import * as Yup from "yup";
import axios from "axios";
import "./Auth.scss";

function SignIn() {
    const [status, setStatus] = useState({ err: "", success: "" });
    const { err, success } = status;
    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().trim().required("Please enter this field."),
        password: Yup.string()
            .min(6, "Please enter at least 6 characters.")
            .required("Please enter this field."),
    });

    const handleLogin = async (values, actions) => {
        try {
            const res = await axios.post('http://localhost:8000/users/login', { ...values });
            setStatus({ err: "", success: "Login successfully !" });
            localStorage.setItem("firstLogin", true);
            localStorage.setItem("userToken", res.data.access_token)
        
            window.location.href = "/";
            actions.resetForm()
        } catch (error) {
            setStatus({ err: error.response.data.error_message , success: "" });
        }
    };

    return (
        <div style={{ paddingTop: "76px" }}>
            <div className="signin">
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <h2 className="auth__title">Login</h2>
                            {success && (
                                <Alert variant="success">Login successfully !</Alert>
                            )}
                            {err && (
                                <Alert variant="danger">
                                   Password or User is incorrect
                                </Alert>
                            )}
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values, actions) => handleLogin(values, actions)}
                            >
                                {(formikProps) => {
                                    const { values, errors, touched } =
                                        formikProps;
                                    return (
                                        <Form>
                                            <FastField
                                                name="username"
                                                component={InputField}
                                                type="text"
                                                label="User Name"
                                                placeholder="dkt@gmail.com"
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
                                                Login
                                            </button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default SignIn;
