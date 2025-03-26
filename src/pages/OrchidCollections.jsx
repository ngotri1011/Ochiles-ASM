import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, useSearchParams } from "react-router-dom";
import {
    Box, Container, Rating, Typography, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
    Card, CardContent, CardMedia, Pagination, Stack,
    Select,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid2';
import { Orchid_URL } from "../api/OrchidAPI";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from '@mui/material/CircularProgress';
import PreviewIcon from '@mui/icons-material/Preview';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const RibbonContainer = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  width: 120px;
  height: 120px;
  z-index: 1;
`;

const Ribbon = styled("div")`
  position: absolute;
  width: 130px;
  top: 11px;
  left: -37px;
  background: linear-gradient(#009900, #006600);
  color: white;
  padding: 8px 0;
  transform: rotate(-45deg);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23);
  clip-path: polygon(27% 0%, 73% 0%, 100% 100%, 0% 100%);
  &::before,
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    border-style: solid;
    border-width: 0;
  }

  &::before {
    left: 0;
    border-width: 0 5px 5px 0;
    border-color: transparent #990000 transparent transparent;
  }

  &::after {
    right: 0;
    border-width: 5px 5px 0 0;
    border-color: #990000 transparent transparent transparent;
  }
`;

const ImageOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    '&:hover': {
        opacity: 1,
    },
}));

const PreviewText = styled(Typography)(({ theme }) => ({
    color: 'white',
    fontWeight: 600,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
}));



const SectionTitle = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60px',
        height: '3px',
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function Orchid() {
    const [orchids, setOrchids] = useState([]);
    const [filteredOrchids, setFilteredOrchids] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [sortOption, setSortOption] = useState("All");
    const [categories, setCategories] = useState([]); // State for categories
    const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

    const handlePageChange = (event, value) => {
        setPage(value);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedOrchids = filteredOrchids.slice(startIndex, endIndex);
    const pageCount = Math.ceil(filteredOrchids.length / itemsPerPage);

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
                const uniqueCategories = [...new Set(data.map(orchid => orchid.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch orchids:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrchids();
    }, []);

    useEffect(() => {
        let filtered = orchids;

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter(orchid =>
                orchid.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(orchid => selectedCategories.includes(orchid.category));
        }

        setFilteredOrchids(filtered);
    }, [searchQuery, orchids, selectedCategories]);

    if (loading) return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <CircularProgress size={60} />
        </Box>
    );
    if (error) return <p>Error: {error}</p>;

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortOption(value);
        let sortedOrchids = [...orchids];

        switch (value) {
            case "featured":
                sortedOrchids = orchids.filter(item => item.isFeatured);
                break;
            case "a-z":
                sortedOrchids.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "z-a":
                sortedOrchids.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "price-low-high":
                sortedOrchids.sort((a, b) => a.cost - b.cost);
                break;
            case "price-high-low":
                sortedOrchids.sort((a, b) => b.cost - a.cost);
                break;
            default:
                sortedOrchids = orchids;
        }
        setFilteredOrchids(sortedOrchids);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(event.target.value);
        setPage(1); // Reset to first page when items per page changes
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setSelectedCategories(prev =>
            prev.includes(value) ? prev.filter(category => category !== value) : [...prev, value]
        );
    };

    return (

        <Box sx={{ display: "flex" }}>
            {/* Filter Section */}
            <Box
                sx={{
                    width: 300, // Fixed width for stability
                    minWidth: 300,
                    maxWidth: 300,
                    height: "100vh",
                    p: 2,
                    my: 15,
                    ml: 3,
                    backgroundColor: "background.paper",
                    position: "sticky",
                    top: 0,
                    overflowY: "auto",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                }}
            >
                <Typography variant="h6">Sort By</Typography>
                <Select value={sortOption} onChange={handleSortChange} fullWidth>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="featured">Featured Items</MenuItem>
                    <MenuItem value="a-z">A-Z</MenuItem>
                    <MenuItem value="z-a">Z-A</MenuItem>
                    <MenuItem value="price-low-high">Price: Low to High</MenuItem>
                    <MenuItem value="price-high-low">Price: High to Low</MenuItem>
                </Select>
                <Typography variant="h6" sx={{ mt: 2 }}>Products per Page</Typography>
                <Select value={itemsPerPage} onChange={handleItemsPerPageChange} fullWidth>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                </Select>
                {/* Categories Accordion */}
                <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Categories</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {categories.map((category) => (
                            <FormControlLabel
                                key={category}
                                control={
                                    <Checkbox
                                        checked={selectedCategories.includes(category)}
                                        onChange={handleCategoryChange}
                                        value={category}
                                    />
                                }
                                label={category}
                            />
                        ))}
                    </AccordionDetails>
                </Accordion>
            </Box>
            {/* orchid grid section */}
            <Box sx={{ flexGrow: 1,mt: 15, ml: 3 }} id="all-orchids">
                <SectionTitle variant="h3">All Orchids</SectionTitle>
                <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
                    {filteredOrchids && filteredOrchids.length > 0 ? (
                        displayedOrchids.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                                <Card sx={{
                                    position: 'relative',
                                    width: 280,
                                    height: 460,
                                    mb: 2.5,
                                    borderRadius: 2,
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.05)'
                                    }
                                }}>
                                    {item.isFeatured && (

                                        <RibbonContainer>
                                            <Ribbon>Featured</Ribbon>
                                        </RibbonContainer>
                                    )}
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            position: 'relative',
                                            height: '320px',
                                            borderRadius: '8px 8px 0 0',
                                            overflow: 'hidden',
                                            '&:hover img': {
                                                filter: 'blur(3px)',
                                                transform: 'scale(1.1)',
                                            },
                                            '& img': {
                                                transition: 'all 0.3s ease-in-out',
                                            }
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <ImageOverlay onClick={() => setSelectedItem(item)}>
                                            <PreviewIcon sx={{ fontSize: 40, color: 'white' }} />
                                            <PreviewText variant="h6">Click to Preview</PreviewText>
                                        </ImageOverlay>
                                    </CardMedia>
                                    <CardContent sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.75,
                                        height: '150px'
                                    }}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 0.9 }}>{item.name}</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 0.9 }}>${item.cost}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                                            <Rating
                                                name="half-rating-read"
                                                defaultValue={2.5}
                                                precision={0.5}
                                                value={item.rating}
                                                readOnly
                                                sx={{ color: 'primary.main' }}
                                            />
                                            <Typography color="text.secondary" sx={{ lineHeight: 0.5 }}>({item.rating}/5)</Typography>
                                        </Box>
                                        <Link
                                            to={`/collections/detail/${item.id}`}
                                            style={{ textDecoration: 'none' }}
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    borderRadius: 1,
                                                    width: '100%',
                                                    height: 36,
                                                    fontSize: '14px',
                                                    p: '4px',
                                                    textTransform: 'none'
                                                }}
                                            >
                                                View Details <ArrowForwardIcon fontSize="small" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid xs={12}>
                            <Typography variant="h6" color="text.secondary" textAlign="center">
                                {searchQuery ? `No orchids found matching "${searchQuery}"` : 'No data available'}
                            </Typography>
                        </Grid>
                    )}
                </Grid>

                {/* Pagination */}
                {filteredOrchids.length > 0 && (
                    <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                        />
                    </Stack>
                )}
            </Box>

            {/* MUI Dialog */}
            <Dialog
                open={Boolean(selectedItem)}
                onClose={() => setSelectedItem(null)}
                scroll="paper"
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', variant: 'h3' }}>{selectedItem?.name || "Orchid Details"}</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={() => setSelectedItem(null)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedItem && (
                        <Box>
                            <Box
                                component="img"
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                sx={{
                                    width: '100%',
                                    maxHeight: 400,
                                    objectFit: 'contain',
                                    display: 'block',
                                    margin: '20px auto',
                                }}
                            />
                            <Typography sx={{ color: 'text.secondary' }}><span style={{ fontWeight: 'bold' }}>Category:</span> {selectedItem.category}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}><LocationOnIcon /> {selectedItem.origin}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{selectedItem.info}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedItem(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}