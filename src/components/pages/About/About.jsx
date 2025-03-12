import React from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { FaLeaf, FaHandHoldingWater, FaLightbulb } from 'react-icons/fa';


const About = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">About Orchids</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FaLeaf className="me-2" /> What are Orchids?
          </Accordion.Header>
          <Accordion.Body>
            Orchids are a diverse and widespread family of flowering plants, with blooms that are often colorful and fragrant. They are known for their beauty and unique structure.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FaHandHoldingWater className="me-2" /> How to Care for Orchids?
          </Accordion.Header>
          <Accordion.Body>
            Orchids require indirect sunlight, moderate watering, and a well-draining potting mix. Avoid overwatering and ensure proper humidity levels for optimal growth.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FaLightbulb className="me-2" /> Interesting Facts about Orchids
          </Accordion.Header>
          <Accordion.Body>
            Did you know that orchids are one of the largest plant families on Earth? They can be found on every continent except Antarctica, and vanilla comes from a type of orchid!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default About;
