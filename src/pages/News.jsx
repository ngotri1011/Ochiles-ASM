import React from "react";
import { Container, Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Sample blog data (Replace with API call if needed)
const blogPosts = [
  {
    id: 1,
    title: "Caring for Your Orchids: Essential Tips",
    image: "https://www.thespruce.com/thmb/DUrtTSkjFwtw20Zkemdl6nmj6jo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/basic-indoor-orchid-care-1902822-e399ddafa79146f48d18c1fc3f3d5db5.png",
    description: "Learn the best practices to keep your orchids healthy and thriving with these expert tips.",
    author: "Sarah Johnson",
    publishDate: "2023-10-15",
    readTime: "5 min read",
    category: "Care Guide"
  },
  {
    id: 2,
    title: "Top 5 Rare Orchid Species",
    image: "https://i.ytimg.com/vi/VZD2zNnM_KM/maxresdefault.jpg",
    description: "Discover the beauty of rare orchids and their unique characteristics.",
    author: "Michael Chen",
    publishDate: "2023-10-12",
    readTime: "7 min read",
    category: "Species Guide"
  },
  {
    id: 3,
    title: "How to Choose the Right Orchid for Your Home",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQamPl5RtsMP9Ls0fj70fY3-d8ArHQouaVS8A&s",
    description: "Find the perfect orchid species that suits your home environment and lifestyle.",
    author: "Emily Davis",
    publishDate: "2023-10-10",
    readTime: "6 min read",
    category: "Buying Guide"
  },
  {
    id: 4,
    title: "Seasonal Orchid Care: Winter Edition",
    image: "https://cdn.mos.cms.futurecdn.net/eYkwJiFf4tNrSSnNeactxL.jpg",
    description: "Essential tips for maintaining your orchids during the cold winter months.",
    author: "David Wilson",
    publishDate: "2023-10-08",
    readTime: "8 min read",
    category: "Seasonal Care"
  },
  {
    id: 5,
    title: "Common Orchid Diseases and Treatment",
    image: "https://images.prismic.io/aosweb/1ceaa88b-5cea-465c-92d3-f443a7077d6f_c-img4.jpg?auto=compress,format",
    description: "Learn to identify and treat common orchid diseases to keep your plants healthy.",
    author: "Lisa Martinez",
    publishDate: "2023-10-05",
    readTime: "10 min read",
    category: "Plant Health"
  },
  {
    id: 6,
    title: "Orchid Propagation Methods",
    image: "https://www.thespruce.com/thmb/NJCHKMc-R6S1JQ8JwQxsddwRpV4=/4000x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1296195506-c13ab285b29e4fc083f892655f734787.jpg",
    description: "Step-by-step guide on different methods to propagate your orchids successfully.",
    author: "James Taylor",
    publishDate: "2023-10-03",
    readTime: "9 min read",
    category: "Propagation"
  },
  {
    id: 7,
    title: "Best Orchid Varieties for Beginners",
    image: "https://www.gardenia.net/wp-content/uploads/2023/05/brassavola-nodosa-300x300.webp",
    description: "Start your orchid journey with these easy-to-grow varieties perfect for beginners.",
    author: "Anna Brown",
    publishDate: "2023-09-30",
    readTime: "5 min read",
    category: "Beginner Guide"
  },
  {
    id: 8,
    title: "Creating the Perfect Orchid Display",
    image: "https://perfectingplaces.com/wp-content/uploads/2022/02/orchids_in_clam_shell_bowl.jpeg",
    description: "Design tips for showcasing your orchid collection in your home or office.",
    author: "Sophie White",
    publishDate: "2023-09-28",
    readTime: "6 min read",
    category: "Design"
  },
  {
    id: 9,
    title: "Advanced Orchid Growing Techniques",
    image: "https://www.wikihow.com/images/thumb/a/a4/Grow-Orchids-Step-5-Version-2.jpg/v4-460px-Grow-Orchids-Step-5-Version-2.jpg",
    description: "Take your orchid growing skills to the next level with these advanced techniques.",
    author: "Robert Green",
    publishDate: "2023-09-25",
    readTime: "12 min read",
    category: "Advanced Guide"
  }
];

const BlogContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2),
  textAlign: 'left',
  margin: theme.spacing(10),
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(23),
  color: theme.palette.primary.main
}));

const BlogCard = styled(Card)(({ theme }) => ({
  height: '100%',
  width: '350px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
  }
}));

const Blog = () => {
  return (
    <BlogContainer>
      <BlogTitle variant="h2">Our Latest News Posts</BlogTitle>
      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {blogPosts.map((post) => (
          <Grid xs={12} md={4} key={post.id}>
            <BlogCard>
              <CardMedia
                component="img"
                height="250"
                image={post.image}
                alt={post.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  By {post.author} • {post.publishDate}
                </Typography>
                <Typography variant="caption" color="primary" sx={{ mb: 2 }}>
                  {post.category} • {post.readTime}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                  {post.description}
                </Typography>
                <Link to="#" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      textTransform: 'none',
                      mt: 'auto'
                    }}
                  >
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </BlogCard>
          </Grid>
        ))}
      </Grid>
    </BlogContainer>
  );
};

export default Blog;
