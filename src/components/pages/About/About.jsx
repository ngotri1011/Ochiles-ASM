import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Container
      sx={{
        textAlign: 'center',
        padding: '3rem 1rem',
        maxWidth: '800px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to <Typography component="span" sx={{ color: '#B03052', fontWeight: 'bold', fontSize: '2.5rem' }}>Orchiles</Typography>
      </Typography>

      <Typography variant="body1" paragraph>
        At Orchid, we are passionate about bringing you the finest selection of orchids
        and plant care essentials. Our mission is to provide high-quality plants,
        expert care advice, and a seamless shopping experience.
      </Typography>
      <Typography variant="body1" paragraph>
        Whether you are a beginner or a seasoned collector, our diverse range of orchids
        and accessories ensures that you'll find the perfect addition to your collection.
      </Typography>
      <Box mt={3}>
        <Button
          variant="contained"
          className='btn-main-style'
          component={Link}
          to="#"
        >
          Explore Our Collection
        </Button>
      </Box>
    </Container>
  );
};

export default About;
