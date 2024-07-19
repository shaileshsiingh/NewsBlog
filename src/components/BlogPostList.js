import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Pagination, Typography } from '@mui/material';
import BlogPostItem from './BlogPostItem';

const BlogPostList = ({ setPosts }) => {
  const [posts, setPostsState] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const maxPages = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'technology',
            pageSize: 5,
            page: page,
            apiKey: '4876c1e043e948089326fad6030396e1'
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setPostsState(response.data.articles);
        setPosts(response.data.articles);
        setTotalPages(Math.ceil(response.data.totalResults / 5));
      } catch (error) {
        if (error.response && error.response.status === 426) {
          // Retry the request with the upgrade header
          try {
            const upgradedResponse = await axios.get('https://newsapi.org/v2/everything', {
              params: {
                q: 'technology',
                pageSize: 5,
                page: page,
                apiKey: '4876c1e043e948089326fad6030396e1'
              },
              headers: {
                'Content-Type': 'application/json',
                'Upgrade': 'h2c'
              }
            });
            setPostsState(upgradedResponse.data.articles);
            setPosts(upgradedResponse.data.articles);
            setTotalPages(Math.ceil(upgradedResponse.data.totalResults / 5));
          } catch (upgradeError) {
            console.error('Error fetching data with upgrade:', upgradeError);
          }
        } else {
          console.error('Error fetching data:', error);
        }
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
        count={totalPages > maxPages ? maxPages : totalPages} 
        page={page} 
        onChange={(event, value) => setPage(value)} 
        sx={{ marginTop: 2 }}
      />
    </Container>
  );
};

export default BlogPostList;
