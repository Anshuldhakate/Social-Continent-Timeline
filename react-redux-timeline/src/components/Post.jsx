import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, addComment, repostPost } from "../redux/postsSlice";
import './Post.css';

const Post = ({ post, parentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Example function to fetch data (could be for comments or likes)
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate data fetching
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [post.hash]);

  const handleLike = () => {
    dispatch(likePost(post.hash));
  };

  const handleComment = () => {
    const commentData = { postId: post.hash, comment: "New comment text" };
    dispatch(addComment(commentData));
  };

  const handleRepost = () => {
    dispatch(repostPost(post.hash));
  };

  // Check if the current post is its own ancestor to prevent infinite loop
  if (post.hash === parentId) {
    return <div>Error: Cannot render a repost within itself.</div>;
  }

  return (
    <div className="post-container">
      {isLoading ? (
        <div className="loading-container">
          <img src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif" alt="Loading" className="loading-image" />
        </div>
      ) : (
        <>
          <div className="user-info">
            <img src={post.author.pfp} alt="Profile" className="profile-pic" />
            <div className="user-details">
              <span className="display-name">{post.author.display_name}</span>
              <span className="username">@{post.author.username}</span>
            </div>
          </div>
          <p className="post-text">{post.text}</p>
          {post.images.length > 0 && (
            <img className="post-image" src={post.images[0].url} alt="Post content" />
          )}

          {/* Display Reposts */}
          {post.repostsList && post.repostsList.length > 0 && (
            <div className="reposts-container">
              {post.repostsList.map((repost) => (
                <Post key={repost.hash} post={repost} parentId={post.hash} />
              ))}
            </div>
          )}

          <div className="post-actions">
            <button onClick={handleLike}>Like {post.likes.count}</button>
            <button onClick={handleComment}>Comment {post.comments.count}</button>
            <button onClick={handleRepost}>Repost {post.reposts}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
