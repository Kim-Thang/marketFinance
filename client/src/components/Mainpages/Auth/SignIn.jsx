import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "./InputField/InputField";
import * as Yup from "yup";
import './Auth.scss';

function SignIn() {
    const initialValues = {
        fullname: "",
        email: "",
        password: "",
        confirmpassword: "",
    };

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required("This filded is required."),
        email: Yup.string()
            .trim()
            .email("Email invalid")
            .required("Please enter this field."),
        password: Yup.string()
            .min(6, "Please enter at least 6 characters.")
            .required("Please enter this field."),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref("password")], "Re-entered password is incorrect.")
            .required("Please enter this field."),
    });

    return (
        <div style={{ paddingTop: "100px" }}>
            <div className="signin">
                <Container>
                    <Row>
                        <Col>
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
                                                name="fullname"
                                                component={InputField}
                                                type="text"
                                                label="Full Name"
                                                placeholder="DoKimThang"
                                            />

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

                                            <FastField
                                                name="confirmpassword"
                                                component={InputField}
                                                type="password"
                                                label="Confirm Password"
                                                placeholder="Enter password again"
                                            />

                                            <button
                                                className="btn-submit"
                                                type="submit"
                                            >
                                                Submit
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
