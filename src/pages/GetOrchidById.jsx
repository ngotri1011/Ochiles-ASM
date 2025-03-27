import React, { useState } from "react";
import {
  Container,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress
} from "@mui/material";
import { OrchidFetchAPI } from "../api/OrchidAPI"; // Import API function

export default function GetOrchidById() {
  const [orchidId, setOrchidId] = useState(""); // Input field state
  const [orchid, setOrchid] = useState(null); // Fetched data state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  const handleSearch = async () => {
    if (!orchidId) {
      setError("Please enter an Orchid ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await OrchidFetchAPI.getById(orchidId);
      setOrchid(data);
    } catch (err) {
      setError("Orchid not found or error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 15 }}>
      {/* Input & Search Button */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <TextField
          label="Enter Orchid ID"
          variant="outlined"
          value={orchidId}
          onChange={(e) => setOrchidId(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && <CircularProgress />}

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Orchid Data Table */}
      {orchid && (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ maxWidth: 1300 }} aria-label="orchid details">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>IsFeatured</TableCell>
                <TableCell>Origin</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Info</TableCell>
                <TableCell>Clip</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={orchid.id}>
                <TableCell>{orchid.id}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={orchid.image || "https://via.placeholder.com/100"}
                    alt={orchid.name}
                    sx={{ width: 100, borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>{orchid.name}</TableCell>
                <TableCell>{orchid.rating}</TableCell>
                <TableCell>{orchid.isFeatured ? "Yes" : "No"}</TableCell>
                <TableCell>{orchid.origin}</TableCell>
                <TableCell>{orchid.category}</TableCell>
                <TableCell>{orchid.info}</TableCell>
                <TableCell>
                  {orchid.clip ? (
                    <a href={orchid.clip} target="_blank" rel="noopener noreferrer">
                      Watch Video
                    </a>
                  ) : (
                    "No video"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
