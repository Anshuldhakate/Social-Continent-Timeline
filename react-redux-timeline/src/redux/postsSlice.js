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
          post.comments.list = [];
        }
        post.comments.list.push(comment);
      }
    },
    repostPostSuccess(state, action) {
      const { hash } = action.payload;
      const originalPost = state.posts.find((p) => p.hash === hash);

      if (originalPost) {
        originalPost.reposts += 1;

        // If the original post doesn't have a reposts list, initialize it
        if (!originalPost.repostsList) {
          originalPost.repostsList = [];
        }

        // Create a new post object for the repost
        const newRepost = {
          ...originalPost,
          hash: `repost_${new Date().getTime()}`, // Generate a unique hash for the repost
          isRepost: true,
          parentPost: originalPost.hash, // Store only the hash of the parent post
          reposts: 0, // Reset repost count for the new post
          comments: { count: 0, list: [] }, // Reset comments for the new post
          likes: { count: 0 }, // Reset likes for the new post
          repostsList: [], // Ensure new reposts start with an empty list
        };

        // Add the new repost to the repostsList of the original post
        originalPost.repostsList.push(newRepost);
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
