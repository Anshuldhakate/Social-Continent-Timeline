import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { likePost, addComment, repostPost } from "../redux/postsSlice";
import './Post.css';

const Post = ({ post, parentId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
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

  const handleRepost = () => {
    dispatch(repostPost(post.hash));
  };

  const handleCommentClick = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const commentData = { postId: post.hash, comment: newComment };
      dispatch(addComment(commentData));
      setNewComment("");
      setShowCommentInput(false);
    }
  };

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

          {post.repostsList && post.repostsList.length > 0 && (
            <div className="reposts-container">
              {post.repostsList.map((repost) => (
                <Post key={repost.hash} post={repost} parentId={post.hash} />
              ))}
            </div>
          )}

          <div className="post-actions">
            <button onClick={handleLike}>Like {post.likes.count}</button>
            <button onClick={handleCommentClick}>
              Comment {post.comments.count}
            </button>
            <button onClick={handleRepost}>Repost {post.reposts}</button>
          </div>

          {showCommentInput && (
            <div className="comment-input">
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Write a comment..."
              />
              <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
