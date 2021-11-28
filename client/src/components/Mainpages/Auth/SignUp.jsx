import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "./InputField/InputField";
import * as Yup from "yup";
import axios from "axios";
import "./Auth.scss";

function SignUp() {
    const [status, setStatus] = useState({ err: "", success: "" });
    const { err, success } = status;
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This filded is required."),
        email: Yup.string()
            .trim()
            .email("Email invalid")
            .required("Please enter this field."),
        password: Yup.string()
            .min(6, "Please enter at least 6 characters.")
            .required("Please enter this field."),

    });

    const handleSubmit = async (values, actions) => {
        try {
            const res = await axios.post('http://localhost:8000/users/register', { ...values });

            // set localstorage de kiem tra ng dung
            localStorage.setItem("firstLogin", true);
            setStatus({ err: "", success: res.data.message });
          
            window.location.href = "/signin";
            actions.resetForm()
        } catch (error) {
            setStatus({ err: "This email has already exist!", success: "" });
        }
    };
    return (
        <div style={{ paddingTop: "100px" }}>
            <div className="signup">
                <Container>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <h2 className="auth__title">Register</h2>
                            {success && (
                                <Alert variant="success">{success}</Alert>
                            )}
                            {err && (
                                <Alert variant="danger">
                                    This email has already exist!
                                </Alert>
                            )}

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(values, actions) =>
                                    handleSubmit(values, actions)
                                }
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
                                                placeholder="NguyenVanA"
                                            />

                                            <FastField
                                                name="email"
                                                component={InputField}
                                                type="text"
                                                label="Email"
                                                placeholder="NguyenVanA@gmail.com"
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
                                                Register
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

export default SignUp;
