// src/components/Timeline.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, likePost, addComment, repostPost } from '../redux/postsSlice';
import axios from 'axios';
import Post from './Post';

const Timeline = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://api.socialcontinent.xyz/api/v1/post/suggested');
        dispatch(setPosts(response.data));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [dispatch]);

  return (
    <div>
      {posts.map(post => (
        <Post
          key={post.hash}
          post={post}
          onLike={postId => dispatch(likePost(postId))}
          onComment={(postId, comment) => dispatch(addComment({ postId, comment }))}
          onRepost={postId => dispatch(repostPost(postId))}
        />
      ))}
    </div>
  );
};

export default Timeline;
