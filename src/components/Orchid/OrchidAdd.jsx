import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Container,
  TextField,
  Box,
  Typography,
  Rating,
  Switch,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Paper,
  Autocomplete,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Orchid_URL } from "../../api/OrchidAPI";

// List of common orchid origins
const nationOptions = [
  "Thailand",
  "Malaysia",
  "Singapore",
  "Indonesia",
  "Philippines",
  "Vietnam",
  "Japan",
  "China",
  "Brazil",
  "Colombia",
  "Ecuador",
  "Peru",
  "Madagascar",
  "Australia",
  "New Zealand"
];

// List of common orchid categories
const categoryOptions = [
  "Phalaenopsis",
  "Dendrobium",
  "Vanda",
  "Cattleya",
  "Oncidium",
  "Paphiopedilum",
  "Cymbidium"
];

export default function OrchidAdd() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const initialValues = {
    name: "",
    rating: 0,
    isFragrance: false,
    image: "",
    color: "",
    origin: "",
    category: "",
    info: "",
    cost: 0,
    clip: "",
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
    clip: Yup.string().url("Must be a valid URL").nullable(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await fetch(Orchid_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to add orchid');
      }

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      setSnackbar({
        open: true,
        message: 'Orchid added successfully!',
        severity: 'success'
      });
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding orchid:", error);
      setSnackbar({
        open: true,
        message: 'Failed to add orchid. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Add New Orchid</Typography>
        <Formik
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ mb: 2 }}
              />

              <Box sx={{ mb: 2 }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  precision={0.5}
                  value={values.rating}
                  onChange={(e, newValue) => setFieldValue("rating", newValue)}
                />
                {touched.rating && errors.rating && (
                  <FormHelperText error>{errors.rating}</FormHelperText>
                )}
              </Box>

              <FormControlLabel
                control={
                  <Switch
                    checked={values.isFragrance}
                    onChange={handleChange}
                    name="isFragrance"
                  />
                }
                label="Is Fragrance"
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth error={touched.color && Boolean(errors.color)} sx={{ mb: 2 }}>
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
                  value={values.color}
                  label="Color"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="">Select Color</MenuItem>
                  <MenuItem value="pink">Pink</MenuItem>
                  <MenuItem value="yellow">Yellow</MenuItem>
                  <MenuItem value="white">White</MenuItem>
                  <MenuItem value="purple">Purple</MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                  <MenuItem value="orange">Orange</MenuItem>
                  <MenuItem value="dark red">Dark Red</MenuItem>
                </Select>
                {touched.color && errors.color && (
                  <FormHelperText>{errors.color}</FormHelperText>
                )}
              </FormControl>

              <Autocomplete
                id="origin"
                freeSolo
                options={nationOptions}
                value={values.origin}
                onChange={(event, newValue) => {
                  setFieldValue("origin", newValue || "");
                }}
                onInputChange={(event, newInputValue) => {
                  setFieldValue("origin", newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Origin"
                    error={touched.origin && Boolean(errors.origin)}
                    helperText={touched.origin && errors.origin}
                    onBlur={handleBlur}
                  />
                )}
                sx={{ mb: 2 }}
              />

              <Autocomplete
                id="category"
                freeSolo
                options={categoryOptions}
                value={values.category}
                onChange={(event, newValue) => {
                  setFieldValue("category", newValue || "");
                }}
                onInputChange={(event, newInputValue) => {
                  setFieldValue("category", newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    error={touched.category && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                    onBlur={handleBlur}
                  />
                )}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                id="info"
                name="info"
                label="Info"
                multiline
                rows={4}
                value={values.info}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.info && Boolean(errors.info)}
                helperText={touched.info && errors.info}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                id="cost"
                name="cost"
                label="Cost"
                type="number"
                inputProps={{ step: "10" }}
                value={values.cost}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cost && Boolean(errors.cost)}
                helperText={touched.cost && errors.cost}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                id="image"
                name="image"
                label="Image URL"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.image && Boolean(errors.image)}
                helperText={touched.image && errors.image}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                id="clip"
                name="clip"
                label="YouTube Clip URL"
                value={values.clip}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.clip && Boolean(errors.clip)}
                helperText={touched.clip && errors.clip || "Optional: Add a YouTube video URL"}
                sx={{ mb: 3 }}
              />
      
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Add Orchid
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/dashboard")}
                >
                  Back
                </Button>
              </Box>
            </Box>
          )}
        </Formik>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
