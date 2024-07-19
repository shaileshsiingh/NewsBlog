import React, { useEffect, useState } from 'react';
import { Container, Pagination, Typography } from '@mui/material';
import BlogPostItem from './BlogPostItem';

const BlogPostList = ({ setPosts }) => {
  const [posts, setPostsState] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const maxPages = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      const searchQuery = 'technology';
      const URL = `https://newsapi.org/v2/everything?q=${searchQuery}&sortBy=popularity&pageSize=5&page=${page}`;
      
      const fetchParams = {
        headers: {
          Authorization: '3e8fcdeadac74b35b8e9ef95298042b7'
        }
      };

      try {
        const response = await fetch(URL, fetchParams);
        
        if (response.status === 426) {
          // Retry with Upgrade header
          const upgradeResponse = await fetch(URL, {
            ...fetchParams,
            headers: {
              ...fetchParams.headers,
              'Upgrade': 'h2c'
            }
          });
          
          const data = await upgradeResponse.json();
          setPostsState(data.articles);
          setPosts(data.articles);
          setTotalPages(Math.ceil(data.totalResults / 5));
        } else {
          const data = await response.json();
          setPostsState(data.articles);
          setPosts(data.articles);
          setTotalPages(Math.ceil(data.totalResults / 5));
        }
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
        count={totalPages > maxPages ? maxPages : totalPages} 
        page={page} 
        onChange={(event, value) => setPage(value)} 
        sx={{ marginTop: 2 }}
      />
    </Container>
  );
};

export default BlogPostList;
