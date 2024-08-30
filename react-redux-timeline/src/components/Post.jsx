import React from "react";
import { useDispatch } from "react-redux";
import { likePost, addComment, repostPost } from "../redux/postsSlice";
import './Post.css';

const Post = ({ post }) => {
  const dispatch = useDispatch();

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

  return (
    <div className="post-container">
      {/* Post Content */}
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
      {post.parentPost && (
        <div className="parent-post">
          <span>Reposted from:</span>
          <div className="parent-details">
            <p className="parent-text">{post.parentPost.text}</p>
            {post.parentPost.images.length > 0 && (
              <img className="parent-image" src={post.parentPost.images[0].url} alt="Parent post content" />
            )}
          </div>
        </div>
      )}
      <div className="post-actions">
        <button onClick={handleLike}>Like {post.likes.count}</button>
        <button onClick={handleComment}>Comment {post.comments.count}</button>
        <button onClick={handleRepost}>Repost {post.reposts}</button>
      </div>
    </div>
  );
};

export default Post;
