import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCopyright } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import orchidLogo2 from '../../assets/images/orchid-logo-dall-E-removebg-preview.png';
const Footer = () => {
  return (
    <footer className="text-light py-4" style={{fontFamily: 'Arial, sans-serif',backgroundColor: '#3D0301'}}>
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <img className="navbar-brand-img" src={orchidLogo2} alt='' style={{width:"50px"}}></img>
            <h3 className="navbar-brand-text" style={{fontWeight:'bold', marginTop:'10px',textDecoration:'none', marginRight:'20px', color:'Pink'}}>Orchiles</h3>
          </Col>
          <Col md={4} className="text-center">
            <a href="/privacy-policy" className="text-light mx-2">Privacy Policy</a> |
            <a href="/terms-of-service" className="text-light mx-2">Terms of Service</a>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <a href="https://facebook.com" className="text-light mx-2" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" className="text-light mx-2" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" className="text-light mx-2" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" className="text-light mx-2" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col>
            <p className="mb-0">
              <FaCopyright /> {new Date().getFullYear()} Orchiles. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
