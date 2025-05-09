// Orchid Detail Collections
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Button, Rating, Typography, Paper, Container, CircularProgress, Dialog, IconButton, DialogTitle } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CategoryIcon from '@mui/icons-material/Category';
import PaletteIcon from '@mui/icons-material/Palette';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Orchid_URL } from "../api/OrchidAPI";

const PageContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  marginTop: theme.spacing(10),
}));

const DetailCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  maxWidth: '1200px',
  minHeight: '600px',
  borderRadius: '20px',
  overflow: 'visible',
  flexDirection: 'row',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: 'auto',
  },
}));

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
  width: 170px;
  top: 25px;
  left: -45px;
  background: linear-gradient(#009900, #006600);
  color: white;
  padding: 8px 0;
  transform: rotate(-45deg);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.23);
  clip-path: polygon(21% 0%, 80% 0%, 100% 100%, 0% 100%);
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

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'hidden',
  borderTopLeftRadius: '20px',
  borderBottomLeftRadius: '20px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    borderRadius: '20px 20px 0 0',
    height: '400px',
  },
}));

const OrchidImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const BackButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -50,
  left: 0,
  zIndex: 2,
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateX(5px)',
  },
}));

const VideoPlayButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  right: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
}));

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  
  // Handle youtu.be format
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  // Handle youtube.com/watch?v= format
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1].split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  
  return null;
};

export default function Detail() {
  const { id } = useParams();
  const [orchid, setOrchid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const fetchOrchidDetail = async () => {
      try {
        const response = await fetch(`${Orchid_URL}/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setOrchid(data);
      } catch (error) {
        console.error("Failed to fetch orchid details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrchidDetail();
  }, [id]);

  if (loading) return (
    <PageContainer>
      <CircularProgress />
    </PageContainer>
  );

  if (error) return (
    <PageContainer>
      <Typography color="error">Error: {error}</Typography>
    </PageContainer>
  );

  if (!orchid) return (
    <PageContainer>
      <Typography>Orchid not found</Typography>
    </PageContainer>
  );

  return (
    <PageContainer>
      <DetailCard elevation={3}>
        <BackButtonContainer>
          <Link to="/collections" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<ChevronLeftIcon />}
              sx={{
                borderRadius: '25px',
                textTransform: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              }}
            >
              Back to Home
            </Button>
          </Link>
        </BackButtonContainer>

        {orchid.isFeatured && (
          <RibbonContainer>
            <Ribbon>Fragrance</Ribbon>
          </RibbonContainer>
        )}

        <ImageContainer>
          <OrchidImage src={orchid.image} alt={orchid.name} />
          {orchid.clip && (
            <VideoPlayButton
              onClick={() => setVideoOpen(true)}
              size="large"
            >
              <PlayCircleIcon sx={{ fontSize: 40 }} />
            </VideoPlayButton>
          )}
        </ImageContainer>

        <DetailsContainer>
          <Typography variant="h3" fontWeight="bold" color="primary">
            {orchid.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {orchid.info}
          </Typography>

          <InfoRow>
            <LocationOnIcon />
            <Typography variant="subtitle1">Origin: {orchid.origin}</Typography>
          </InfoRow>

          <InfoRow>
            <AttachMoneyIcon />
            <Typography variant="subtitle1">Price: ${orchid.cost.toLocaleString()}</Typography>
          </InfoRow>

          <InfoRow>
            <Typography variant="subtitle1">
              Fragrance: {' '}
              {orchid.isFeatured ? (
                <CheckCircleIcon sx={{ color: "green", verticalAlign: 'middle' }} />
              ) : (
                <CancelIcon sx={{ color: "red", verticalAlign: 'middle' }} />
              )}
            </Typography>
          </InfoRow>

          <InfoRow>
            <CategoryIcon />
            <Typography variant="subtitle1">Category: {orchid.category}</Typography>
          </InfoRow>

          <InfoRow>
            <PaletteIcon />
            <Typography variant="subtitle1">
              Color:{' '}
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: 20,
                  height: 20,
                  bgcolor: orchid.color,
                  borderRadius: '50%',
                  border: '2px solid #ddd',
                  verticalAlign: 'middle',
                  ml: 1,
                }}
              />
            </Typography>
          </InfoRow>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <Typography variant="subtitle1">Rating:</Typography>
            <Rating
              value={orchid.rating}
              readOnly
              precision={0.5}
              sx={{ color: 'primary.main' }}
            />
            <Typography variant="body2" color="text.secondary">
              ({orchid.rating}/5)
            </Typography>
          </Box>
        </DetailsContainer>
      </DetailCard>

      {/* Video Modal */}
      <Dialog
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ 
          position: 'relative', 
          bgcolor: 'background.paper',
          borderRadius: 1,
          overflow: 'hidden'
        }}>
          <DialogTitle sx={{
            p: 2,
            pr: 6,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTypography-root': {
              fontSize: '1.5rem',
              fontWeight: 500
            }
          }}>
            Video for {orchid?.name}
          </DialogTitle>
          <Box sx={{ 
            width: '100%', 
            pt: '56.25%', 
            position: 'relative',
            bgcolor: 'black'
          }}>
            <Box
              component="iframe"
              src={getYouTubeEmbedUrl(orchid?.clip)}
              title={`${orchid?.name} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </Box>
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'flex-end',
            borderTop: 1,
            borderColor: 'divider'
          }}>
            <Button
              variant="outlined"
              onClick={() => setVideoOpen(false)}
              startIcon={<CloseIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>
    </PageContainer>
  );
}
