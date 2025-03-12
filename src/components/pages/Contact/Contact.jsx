import React from "react";
import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
function Contact() {
    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: "",
            content: "",
            major: "",
            agree: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
            email: Yup.string().required("Required.").email("Invalid email"),
            content: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
            major: Yup.string().required("Please select a program."),
            agree: Yup.boolean().oneOf([true], "The terms and conditions must be accepted."),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <Container>
            <Row className="justify-content-md-center" >
                <Col
                    md={6}
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        padding: "20px",
                        borderRadius: "10px",
                        margin: "50px",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <h3>Contact Us</h3>
                        
                        
                    </div>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Your name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.name && <Alert variant="warning">{formik.errors.name}</Alert>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.email && <Alert variant="warning">{formik.errors.email}</Alert>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Major</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="major"
                                value={formik.values.major}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select your favorite orchid</option>
                                <option value="Computer Science">Taichung Beauty</option>
                                <option value="Information Technology">Golden Sunset</option>
                                <option value="Software Engineering">Moonlit Pearl</option>
                                <option value="Cyber Security">Lavender Mist</option>
                            </Form.Select>
                            {formik.errors.major && <Alert variant="warning">{formik.errors.major}</Alert>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.content && <Alert variant="warning">{formik.errors.content}</Alert>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="Agree to terms and conditions"
                                name="agree"
                                checked={formik.values.agree}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.agree && <Alert variant="warning">{formik.errors.agree}</Alert>}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="btn-main-style">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
