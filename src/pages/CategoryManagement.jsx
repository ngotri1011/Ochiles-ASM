import React, { useState, useEffect } from "react";
import { category_url } from "../api/OrchidAPI";
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    axios.get(category_url).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleSearch = () => {
    if (searchId) {
      setCategories((prev) => prev.filter((cat) => cat.id === searchId));
    } else {
      axios.get(category_url).then((response) => {
        setCategories(response.data);
      });
    }
  };

  return (
    <Container sx={{ my: 15 }}>
      {/* Buttons for Adding and Searching */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button
          component={Link}
          to="/category/add"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Add new Category
        </Button>
        Add Category
        <Box display="flex" gap={1}>
          <TextField
            label="Search by ID"
            variant="outlined"
            size="small"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>

      {/* Table Display */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Native Area</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Light</TableCell>
              <TableCell>Water</TableCell>
              <TableCell>Temperature</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.nativeArea}</TableCell>
                <TableCell>{category.height}</TableCell>
                <TableCell>{category.light}</TableCell>
                <TableCell>{category.water}</TableCell>
                <TableCell>{category.temp}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CategoryManagement;
