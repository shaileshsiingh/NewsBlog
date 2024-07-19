import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const BlogPostDetails = ({ posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts[id];

  if (!post) {
    return <Typography variant="h5">Post not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom>{post.title}</Typography>
      <img src={post.urlToImage} alt={post.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
      <Typography variant="body1" paragraph>{post.content}</Typography>
      <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
    </Container>
  );
};

export default BlogPostDetails;