import React from "react";
import { Form } from "react-bootstrap";
import './InputField.scss'
function InputField(props) {
    const { field, form, type, label, placeholder, disabled, defaultValue } = props;
    const { name, value, onChange, onBlur } = field;

    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <Form.Group style={{marginBottom: "20px"}}>
            {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
            <Form.Control
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                disable={disabled}
                placeholder={placeholder}

                defaultValue={defaultValue}
                isInvalid = {showError}
            />

            {showError && (
                <Form.Control.Feedback type="invalid">
                   {errors[name]}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    );
}

export default InputField;
