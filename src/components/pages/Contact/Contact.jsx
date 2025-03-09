import React from "react";
import { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import bgImg from "../../../assets/images/orchid-bg.jpg";
import orchidLogo2 from "../../../assets/images/orchid-logo-dall-E-removebg-preview.png";
function Contact() {
    const formik = useFormik({
        initialValues: {
            name: "",
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
            <img
                src={bgImg}
                alt="background"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -1,
                }}
            />
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
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <h1 class="navbar-brand-img" style={{ textDecoration: 'none' }}>
                            <img src={orchidLogo2} alt='' style={{ width: "50px" }}></img>
                        </h1>
                        <h2 class="navbar-brand-text"
                            style={{ textDecoration: 'none', marginRight: '20px', color: 'Pink', fontWeight: 'bold' }}>
                            <h3 style={{ fontWeight: 'bold', marginTop: '10px' }}>Orchiles</h3>
                        </h2>
                        </div>
                        
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
                                <option value="">Select your major</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="Cyber Security">Cyber Security</option>
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

                        <Button variant="primary" type="submit" style={{backgroundColor:"#B03052", borderColor:"black"}}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Contact;
