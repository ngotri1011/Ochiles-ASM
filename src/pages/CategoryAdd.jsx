import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { category_url } from "../api/OrchidAPI";

const validationSchema = yup.object({
  name: yup.string().required("Category name is required"),
  nativeArea: yup.string().required("Native area is required"),
  height: yup.string().required("Height is required"),
  light: yup.string().required("Light requirement is required"),
  water: yup.string().required("Water requirement is required"),
  temp: yup.string().required("Temperature requirement is required"),
});

const AddCategory = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      nativeArea: "",
      height: "",
      light: "",
      water: "",
      temp: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(category_url, values);
        alert("Category added successfully!");
        navigate("/category");
      } catch (error) {
        console.error("Error adding category:", error);
        alert("Failed to add category");
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add New Category
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {Object.keys(formik.initialValues).map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="normal"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched[field] && Boolean(formik.errors[field])}
              helperText={formik.touched[field] && formik.errors[field]}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={() => navigate("/category")}>
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddCategory;
