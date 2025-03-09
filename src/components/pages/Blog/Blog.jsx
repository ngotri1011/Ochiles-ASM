import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Sample blog data (Replace with API call if needed)
const blogPosts = [
  {
    id: 1,
    title: "Caring for Your Orchids: Essential Tips",
    image: "https://hoalantoda.vn/wp-content/uploads/2022/05/Lua-3100.jpg",
    description: "Learn the best practices to keep your orchids healthy and thriving with these expert tips.",
  },
  {
    id: 2,
    title: "Top 5 Rare Orchid Species",
    image: "https://hoalantoda.vn/wp-content/uploads/2022/05/lua-7.jpg",
    description: "Discover the beauty of rare orchids and their unique characteristics.",
  },
  {
    id: 3,
    title: "How to Choose the Right Orchid for Your Home",
    image: "https://hoalantoda.vn/wp-content/uploads/2022/05/lua-5.jpg",
    description: "Find the perfect orchid species that suits your home environment and lifestyle.",
  },
];

// Styled Components
const BlogContainer = styled(Container)`
  padding: 50px 20px;
  text-align: center;
`;

const BlogTitle = styled("h2")`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BlogCard = styled(Card)`
  overflow: hidden;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Blog = () => {
  return (
    <BlogContainer>
      <BlogTitle>Our Latest Blog Posts</BlogTitle>
      <Row className="justify-content-center">
        {blogPosts.map((post) => (
          <Col key={post.id} md={4} className="d-flex align-items-stretch mb-4">
            <BlogCard>
              <Card.Img variant="top" src={post.image} style={{ height: "250px", objectFit: "cover" }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{post.title}</Card.Title>
                <Card.Text className="flex-grow-1">{post.description}</Card.Text>
                <Link /* to={`/blog/${post.id}`} */ to={`#`}>
                  <Button variant="primary" className="mt-auto" style={{backgroundColor:"#B03052", borderColor:"black"}}>Read More</Button>
                </Link>
              </Card.Body>
            </BlogCard>
          </Col>
        ))}
      </Row>
    </BlogContainer>
  );
};

export default Blog;
