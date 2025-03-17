import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, useSearchParams } from "react-router-dom";
import { Box, Container, Rating, Typography, Button,
Dialog, DialogTitle, DialogContent, DialogActions, IconButton,
Card, CardContent, CardMedia, Pagination, Stack, Paper, useTheme, useMediaQuery, Icon, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Orchid_URL } from "../../api/OrchidAPI";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from '@mui/material/CircularProgress';
import PreviewIcon from '@mui/icons-material/Preview';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as SwiperPagination, Autoplay } from 'swiper/modules';
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

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  minHeight: '600px',
  width: '100%',
  overflow: 'hidden',
  marginBottom: theme.spacing(8),
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
  width: '80%',
  maxWidth: '800px',
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1,
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
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

const ScrollButton = styled(Button)(({ theme }) => ({
  px: 4,
  py: 1.5,
  fontSize: '1.1rem',
  textTransform: 'none',
  borderRadius: '30px',
  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
}));

const heroSlides = [
  {
    image: 'https://als-gardencenter.com/cdn/shop/articles/moth_orchid.jpg?v=1704745423',
    title: 'Discover Rare Orchids',
    subtitle: 'Explore our exclusive collection of beautiful orchids',
    cta: 'Shop Now'
  },
  {
    image: 'https://www.gardenia.net/wp-content/uploads/2023/01/7Vwkpw8KBQNpnh7h3uiwGnYyndeZCQRLhJCYdHB5.jpg',
    title: 'Premium Quality',
    subtitle: 'Carefully nurtured orchids for your home',
    cta: 'View Collection'
  },
  {
    image: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blte2fce01e394ec467/66bb59dc1257f5801fb3e71c/types-of-orchids-phalaenopsis.jpg?q=70&width=3840&auto=webp',
    title: 'Expert Care Guide',
    subtitle: 'Learn how to care for your orchids',
    cta: 'Learn More'
  }
];

const features = [
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
    title: 'Free Shipping',
    description: 'Free shipping on orders over $100'
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: 'Secure Payment',
    description: '100% secure payment methods'
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
    title: '24/7 Support',
    description: 'Expert support for your questions'
  },
  {
    icon: <EmojiNatureIcon sx={{ fontSize: 40 }} />,
    title: 'Quality Guarantee',
    description: '30-day quality guarantee'
  }
];

export default function Orchid() {
  const [orchids, setOrchids] = useState([]);
  const [filteredOrchids, setFilteredOrchids] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Calculate pagination
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
      } catch (error) {
        console.error("Failed to fetch orchids:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrchids();
  }, []);

  // Filter orchids based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrchids(orchids);
      return;
    }

    const filtered = orchids.filter(orchid =>
      orchid.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrchids(filtered);
  }, [searchQuery, orchids]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Swiper
          modules={[Navigation, SwiperPagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            color: 'primary.main',
            '& .swiper-button-next, & .swiper-button-prev': {
              color: 'primary.main',
            },
          }}
          pagination={{ 
            clickable: true,
            color: 'primary.main',
            '& .swiper-pagination-bullet-active': {
              backgroundColor: 'primary.main',
            },
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '80vh',
                  minHeight: '600px',
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <HeroOverlay />
                <HeroContent>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '4rem' },
                      fontWeight: 700,
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 4,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {slide.subtitle}
                  </Typography>
                  <ScrollButton
                    variant="contained"
                    onClick={() => {
                      switch(slide.cta) {
                        case 'Shop Now':
                          scrollToSection('all-orchids');
                          break;
                        case 'View Collection':
                          scrollToSection('featured-collection');
                          break;
                        case 'Learn More':
                          scrollToSection('features');
                          break;
                      }
                    }}
                  >
                    {slide.cta}
                  </ScrollButton>
                </HeroContent>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }} id="features">
        <Grid container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard elevation={3}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Collection Section */}
      <Container sx={{ mb: 8 }} id="featured-collection">
        <SectionTitle variant="h3">
          Featured Collection
        </SectionTitle>
        <Grid container spacing={4}>
          {orchids.slice(0, 4).map((orchid) => (
            <Grid item xs={12} sm={6} md={3} key={orchid.id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={orchid.image}
                  alt={orchid.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {orchid.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${orchid.cost}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8, mb: 8, ml: 20 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Subscribe to Our Newsletter
              </Typography>
              <Typography color="text.secondary">
                Get the latest updates on new products and upcoming sales.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Existing Orchid Grid Section */}
      <Box sx={{mt: 15, ml: 3}} id="all-orchids">
        <SectionTitle variant="h3">
          All Orchids
        </SectionTitle>
        <Grid container spacing={2} sx={{ mt: 4, mb: 4, ml: 14 }}>
          {filteredOrchids && filteredOrchids.length > 0 ? (
            displayedOrchids.map((item) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card sx={{ 
                  position: 'relative',
                  width: 300,
                  height: 460,
                  mb: 2.5,
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}>
                  {item.isFragrance&& (
                    <RibbonContainer>
                      <Ribbon>Fragrance</Ribbon>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,  }}>
                      <Rating 
                        name="half-rating-read"
                        defaultValue={2.5} 
                        precision={0.5} 
                        value={item.rating} 
                        readOnly 
                        sx={{color: 'primary.main'}}
                      />
                      <Typography color="text.secondary" sx={{ lineHeight: 0.5 }}>({item.rating}/5)</Typography>
                    </Box>
                    <Link 
                      to={`/detail/${item.id}`} 
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
          <Typography sx={{ fontWeight: 'bold', fontSize: '2rem', variant:'h3' }}>{selectedItem?.name || "Orchid Details"}</Typography>
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
              <Typography sx={{color: 'text.secondary'}}><span style={{fontWeight: 'bold'}}>Category:</span> {selectedItem.category}</Typography>
              <Typography sx={{color: 'text.secondary'}}><LocationOnIcon/> {selectedItem.origin}</Typography>
              <Typography  sx={{color: 'text.secondary'}}>{selectedItem.info}</Typography>
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
