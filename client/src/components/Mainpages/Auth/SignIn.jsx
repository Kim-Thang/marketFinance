import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "./InputField/InputField";
import * as Yup from "yup";
import "./Auth.scss";

function SignIn() {
    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().required("Please enter this field."),
        password: Yup.string()
            .min(6, "Please enter at least 6 characters.")
            .required("Please enter this field."),
    });

    return (
        <div style={{ paddingTop: "100px" }}>
            <div className="signin">
                <Container>
                    <Row>
                        <Col>
                        <h2 className="auth__title">Login</h2>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={(value) =>
                                    console.log("value", value)
                                }
                            >
                                {(formikProps) => {
                                    const { values, errors, touched } =
                                        formikProps;
                                    console.log({ values, errors, touched });

                                    return (
                                        <Form>
                                            <FastField
                                                name="email"
                                                component={InputField}
                                                type="text"
                                                label="Email"
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
