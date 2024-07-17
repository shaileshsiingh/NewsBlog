import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const BlogPostItem = ({ post, index }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          <Link to={`/post/${index}`}>{post.title}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {new Date(post.publishedAt).toDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogPostItem;
