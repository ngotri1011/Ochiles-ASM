import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Orchid_URL } from "../../api/OrchidAPI";

export default function OrchidEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);

  useEffect(() => {
    const fetchOrchid = async () => {
      try {
        const response = await fetch(`${Orchid_URL}/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orchid');
        }
        const data = await response.json();
        setOrchid(data);
      } catch (error) {
        console.error("Error fetching orchid:", error);
        toast.error("Failed to fetch orchid details", { position: "top-right", autoClose: 2000 });
      }
    };

    fetchOrchid();
  }, [id]);

  const initialValues = {
    id: orchid?.id || "",
    name: orchid?.name || "",
    rating: orchid?.rating || 0,
    isSpecial: orchid?.isSpecial || false,
    image: orchid?.image || "",
    color: orchid?.color || "",
    origin: orchid?.origin || "",
    category: orchid?.category || "",
    info: orchid?.info || "",
    cost: orchid?.cost || 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    rating: Yup.number()
      .min(0, "Minimum rating is 0")
      .max(5, "Maximum rating is 5")
      .required("Rating is required"),
    image: Yup.string().url("Must be a valid URL").required("Image is required"),
    color: Yup.string().required("Color is required"),
    origin: Yup.string().required("Origin is required"),
    category: Yup.string().required("Category is required"),
    info: Yup.string().required("Info is required"),
    cost: Yup.number().min(0, "Cost must be at least 0").required("Cost is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`${Orchid_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update orchid');
      }

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      toast.success("Orchid updated successfully!", { position: "top-right", autoClose: 2000 });
      navigate("/list");
    } catch (error) {
      console.error("Error updating orchid:", error);
      toast.error("Failed to update orchid. Please try again.", { position: "top-right", autoClose: 2000 });
    } finally {
      setSubmitting(false);
    }
  };

  if (!orchid) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{ marginTop: "50px", marginBottom: "50px" }}>
      <Row className="justify-content-md-center mt-4">
        <Col md={8}>
          <h2>Edit Orchid</h2>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter orchid name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Rating (using MUI Rating) */}
                <Form.Group controlId="rating" className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <div>
                    <Rating
                      name="half-rating"
                      precision={0.5}
                      value={values.rating}
                      onChange={(e, newValue) => setFieldValue("rating", newValue)}
                    />
                    {touched.rating && errors.rating && (
                      <div className="text-danger">{errors.rating}</div>
                    )}
                  </div>
                </Form.Group>

                {/* isSpecial */}
                <Form.Group controlId="isSpecial" className="mb-3">
                  <Form.Check
                    type="switch"
                    name="isSpecial"
                    label="Is Special"
                    checked={values.isSpecial}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Group>

                {/* Image URL */}
                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Enter image URL"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.image && errors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.image}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Color (as a select) */}
                <Form.Group controlId="color" className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Select
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.color && errors.color}
                  >
                    <option value="">Select Color</option>
                    <option value="pink">Pink</option>
                    <option value="yellow">Yellow</option>
                    <option value="white">White</option>
                    <option value="purple">Purple</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="orange">Orange</option>
                    <option value="dark red">Dark Red</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.color}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Origin */}
                <Form.Group controlId="origin" className="mb-3">
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    name="origin"
                    placeholder="Enter origin"
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.origin && errors.origin}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.origin}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Category  */}
                <Form.Group controlId="category" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.category && errors.category}
                    list="categoryOptions"
                    placeholder="Enter or select a category"
                  />
                  <datalist id="categoryOptions">
                    <option value="Cattleya" />
                    <option value="Dendrobium" />
                    <option value="Cymbidium" />
                    <option value="Vanda" />
                    <option value="Oncidium" />
                    <option value="Phalaenopsis" />
                  </datalist>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>


                {/* Info */}
                <Form.Group controlId="info" className="mb-3">
                  <Form.Label>Info</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="info"
                    placeholder="Enter info about the orchid"
                    value={values.info}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.info && errors.info}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.info}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Cost */}
                <Form.Group controlId="cost" className="mb-3">
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    type="number"
                    name="cost"
                    placeholder="Enter cost"
                    value={values.cost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.cost && errors.cost}
                    step="10"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cost}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <Button type="submit" variant="primary" className="btn-main-style">
                    Update Orchid
                  </Button>
                  <Button variant="secondary" onClick={() => navigate("/list")}>
                    Back
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
