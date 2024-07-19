import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const HoverCard = styled(Card)({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
  display: 'flex',
  marginBottom: '16px',
});

const CardImage = styled('img')({
  width: '150px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '4px 0 0 4px',
});

const CardDetails = styled(CardContent)({
  flex: '1',
  padding: '16px',
});

const BlogPostItem = ({ post, index }) => {
  return (
    <HoverCard>
      {post.urlToImage && <CardImage src={post.urlToImage} alt={post.title} />}
      <CardDetails>
        <Typography variant="h5" component="div">
          <Link to={`/post/${index}`}>{post.title}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {new Date(post.publishedAt).toDateString()}
        </Typography>
      </CardDetails>
    </HoverCard>
  );
};

export default BlogPostItem;
