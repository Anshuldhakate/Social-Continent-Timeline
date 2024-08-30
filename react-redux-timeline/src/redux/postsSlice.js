// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { simulateApiCall } from '../api';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    likePostSuccess(state, action) {
      const post = state.posts.find((p) => p.hash === action.payload.hash);
      if (post) {
        post.likes.count += 1;
      }
    },
    addCommentSuccess(state, action) {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.hash === postId);
      if (post) {
        post.comments.count += 1;
        if (!post.comments.list) {
          post.comments.list = []; // Initialize the list if it doesn't exist
        }
        post.comments.list.push(comment);
      }
    },
    repostPostSuccess(state, action) {
      const post = state.posts.find((p) => p.hash === action.payload.hash);
      if (post) {
        post.reposts += 1;
      }
    },
  },
});

export const { setPosts, likePostSuccess, addCommentSuccess, repostPostSuccess } = postsSlice.actions;

export const likePost = (postHash) => async (dispatch) => {
  await simulateApiCall('likePost', { hash: postHash });
  dispatch(likePostSuccess({ hash: postHash }));
};

export const addComment = (commentData) => async (dispatch) => {
  await simulateApiCall('addComment', commentData);
  dispatch(addCommentSuccess(commentData));
};

export const repostPost = (postHash) => async (dispatch) => {
  await simulateApiCall('repostPost', { hash: postHash });
  dispatch(repostPostSuccess({ hash: postHash }));
};

export default postsSlice.reducer;
