import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { useThemeContext } from '../darkmode/ThemeContext';
import orchidLogo2 from '../assets/orchid-logo-dall-E-removebg-preview.png';
import * as React from 'react';
const Footer = () => {
  const { mode } = useThemeContext();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        py: 6,
        borderTop: 1,
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img src={orchidLogo2} alt="Orchiles Logo" style={{ height: 50, marginRight: 10 }} />
              <Typography variant="h6" color="inherit">
                Orchiles
              </Typography>
            </Box>
            <Typography variant="body2" color="inherit" sx={{ mb: 2 }}>
              Your premier destination for exotic and rare orchids. We provide carefully cultivated orchids 
              and expert guidance to help your collection thrive.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="inherit" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>About Us</Link>
            <Link href="/catalog" color="inherit" display="block" sx={{ mb: 1 }}>Orchid Catalog</Link>
            <Link href="/care-guide" color="inherit" display="block" sx={{ mb: 1 }}>Care Guide</Link>
            <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>Contact Us</Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="inherit" sx={{ mb: 2 }}>
              Contact Information
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
              Email: info@orchiles.com
            </Typography>
            <Typography variant="body2" color="inherit" sx={{ mb: 1 }}>
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2" color="inherit">
              Address: 123 Orchid Lane, Garden City, GC 12345
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Orchiles. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
