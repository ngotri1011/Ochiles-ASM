import React from 'react';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FavoriteIcon from '@mui/icons-material/Favorite';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 2
        }}>
          About Orchiles
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          Your trusted destination for premium orchids, where passion meets expertise in bringing nature's most elegant blooms to your doorstep.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s ease-in-out' } }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <LocalFloristIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="h2">Our Story</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Founded in 2020, Orchiles began with a simple mission: to share the beauty of orchids with plant enthusiasts worldwide. What started as a small family-owned nursery has blossomed into a premier online destination for orchid lovers.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s ease-in-out' } }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EmojiNatureIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="h2">Our Expertise</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                With over a decade of collective experience in orchid cultivation, our team of experts carefully selects and nurtures each plant. We specialize in rare varieties and beginner-friendly orchids, ensuring every customer finds their perfect match.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s ease-in-out' } }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <HandshakeIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="h2">Our Commitment</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                We're committed to providing not just beautiful orchids, but also comprehensive care guidance and support. Each purchase comes with detailed care instructions and access to our expert consultation service.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: 3, '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s ease-in-out' } }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <FavoriteIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" component="h2">Our Values</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Sustainability and customer satisfaction are at the heart of everything we do. We practice eco-friendly cultivation methods and ensure each orchid is shipped with the utmost care to arrive healthy and beautiful at your doorstep.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
