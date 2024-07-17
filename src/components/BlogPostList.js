

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Pagination, Typography } from '@mui/material';
import BlogPostItem from './BlogPostItem';

const BlogPostList = ({ setPosts }) => {
  const [posts, setPostsState] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const maxPages = 500;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'in',
            pageSize: 5,
            page: page,
            apiKey: '4876c1e043e948089326fad6030396e1' // Ensure this is valid and has no restrictions
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setPostsState(response.data.articles);
        setPosts(response.data.articles);
        const calculatedTotalPages = Math.ceil(response.data.totalResults / 5);
        setTotalPages(calculatedTotalPages > maxPages ? maxPages : calculatedTotalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, [page, setPosts]);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        News/Events of the Week
      </Typography>
      {posts.map((post, index) => (
        <BlogPostItem key={index} post={post} index={index} />
      ))}
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={(event, value) => setPage(value)} 
        sx={{ marginTop: 2 }}
      />
    </Container>
  );
};

export default BlogPostList;
