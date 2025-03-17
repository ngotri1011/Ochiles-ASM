import React, { useEffect, useState } from "react";
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
  Typography, 
  Pagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
  Tooltip
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Orchid_URL } from "../../api/OrchidAPI";

export default function OrchidList() {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const numRowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    orchidId: null
  });
  const [playingVideoId, setPlayingVideoId] = useState(null);
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

  const handleVideoClick = (clip, orchidId) => {
    if (clip) {
      const videoId = clip.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (videoId) {
        setPlayingVideoId(playingVideoId === orchidId ? null : orchidId);
      }
    }
  };

  // Fetch data from API
  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        const response = await fetch(Orchid_URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const errorText = await response.text();
          throw new Error(`Invalid JSON response: ${errorText.substring(0, 100)}`);
        }
        const data = await response.json();
        setOrchids(data);
      } catch (error) {
        console.error("Failed to fetch orchids:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrchids();
  }, []);

  // Pagination logic
  useEffect(() => {
    const sortedOrchids = [...orchids].sort((a, b) => a.id - b.id);
    const start = (currentPage - 1) * numRowsPerPage;
    const end = start + numRowsPerPage;
    setPaginatedData(sortedOrchids.slice(start, end));
  }, [orchids, currentPage]);

  const numPages = Math.ceil(orchids.length / numRowsPerPage);

  const handlePageChange = (event, page) => setCurrentPage(page);

  const handleDeleteClick = (id) => {
    setDeleteDialog({
      open: true,
      orchidId: id
    });
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      orchidId: null
    });
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      const response = await fetch(`${Orchid_URL}/${deleteDialog.orchidId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete orchid');
      }

      setOrchids((prevOrchids) => prevOrchids.filter((orchid) => orchid.id !== deleteDialog.orchidId));
      setSnackbar({
        open: true,
        message: 'Orchid deleted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error("Error deleting orchid:", error);
      setSnackbar({
        open: true,
        message: 'Failed to delete orchid. Please try again.',
        severity: 'error'
      });
    } finally {
      handleCloseDeleteDialog();
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <Typography color="error" variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button
          component={Link}
          to="/dashboard/add"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none' }}
        >
          Add new Orchid
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ maxWidth: 1300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Fragrance</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Info</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Clip</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((orchid) => (
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
                <TableCell>{orchid.isFragrance ? "Yes" : "No"}</TableCell>
                <TableCell>{orchid.color}</TableCell>
                <TableCell>{orchid.origin}</TableCell>
                <TableCell>{orchid.category}</TableCell>
                <TableCell>{orchid.info}</TableCell>
                <TableCell>${orchid.cost}</TableCell>
                <TableCell>
                  {orchid.clip ? (
                    <Box sx={{ width: 150, height: 100 }}>
                      {playingVideoId === orchid.id ? (
                        <Box
                          sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            borderRadius: 1,
                            overflow: 'hidden'
                          }}
                        >
                          <iframe
                            src={`https://www.youtube.com/embed/${orchid.clip.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </Box>
                      ) : (
                        <Tooltip title="Click to play video">
                          <Box
                            onClick={() => handleVideoClick(orchid.clip, orchid.id)}
                            sx={{
                              cursor: 'pointer',
                              '&:hover': {
                                opacity: 0.8,
                                transition: 'opacity 0.2s'
                              }
                            }}
                          >
                            <Box
                              component="img"
                              src={`https://img.youtube.com/vi/${orchid.clip.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]}/mqdefault.jpg`}
                              alt={`${orchid.name} video thumbnail`}
                              sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 1,
                                objectFit: 'cover'
                              }}
                            />
                          </Box>
                        </Tooltip>
                      )}
                    </Box>
                  ) : (
                    "No video"
                  )}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      component={Link}
                      to={`/dashboard/edit/${orchid.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(orchid.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={numPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this orchid? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
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
