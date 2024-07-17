import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPostDetails from './components/BlogPostDetails';

const App = () => {
  const [posts, setPosts] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPostList setPosts={setPosts} />} />
        <Route path="/post/:id" element={<BlogPostDetails posts={posts} />} />
      </Routes>
    </Router>
  );
};

export default App;
