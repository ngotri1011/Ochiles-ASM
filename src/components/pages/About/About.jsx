import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AboutContainer = styled(Container)`
  text-align: center;
  padding: 3rem 1rem;
  max-width: 800px;
`;

const HighlightText = styled.span`
  color: #FFC0CB;
  font-weight: bold;
`;

const About = () => {
  return (
    <AboutContainer>
      <Typography variant="h3" gutterBottom>
        Welcome to <HighlightText>Orchiles</HighlightText> 
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
          sx={{ backgroundColor: '#FFC0CB', '&:hover': { backgroundColor: 'rgb(199, 124, 137)' } }}
          component={Link}
          to="/shop"
        >
          Explore Our Collection
        </Button>
      </Box>
    </AboutContainer>
  );
};

export default About;
