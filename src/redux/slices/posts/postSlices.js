import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from '../../../utils/baseURL';

//reset state
export const resetCreateAction = createAction("post/reset");
export const resetPostEdit = createAction("post/reset-update");
export const resetPostDelete = createAction("post/delete");

//create post
export const createPostAction = createAsyncThunk(
    "post/created",
    async (post, {rejectWithValue, getState, dispatch}) => {
        console.log(post);
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        };
        try {
            const formData = new FormData();
            formData.append('title', post?.title);
            formData.append('description', post?.description);
            formData.append('category', post?.category); // no label here
            formData.append('image', post?.image);
            //console.log(post.category);
            const { data } = await axios.post(`${baseUrl}/api/posts`, formData, config);
            dispatch(resetCreateAction());
            return data;
        } catch (error) {
            if(!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    });

//Update
export const updatePostAction = createAsyncThunk(
    "post/updated",
    async (post, { rejectWithValue, getState, dispatch }) => {
      console.log(post);
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        //http call
        const { data } = await axios.put(
          `${baseUrl}/api/posts/${post?.id}`,
          post,
          config
        );
        //dispatch
        dispatch(resetPostEdit());
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
//Delete
export const deletePostAction = createAsyncThunk(
    "post/delete",
    async (postId, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        //http call
        const { data } = await axios.delete(
          `${baseUrl}/api/posts/${postId}`,
          config
        );
        //dispatch
        dispatch(resetPostDelete());
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//fetch all post
export const fetchPostsAction = createAsyncThunk(
    "post/lists",
    async (category, {rejectWithValue, getState, dispatch}) => {
        try {
            if(category) {
                const { data } = await axios.get(`${baseUrl}/api/posts/?category=${category}`);
                return data;
            }
            else {
                const { data } = await axios.get(`${baseUrl}/api/posts/`);
                return data;
            }
        } catch (error) {
            if(!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    });

//fetch Post details
export const fetchPostDetailsAction = createAsyncThunk(
    "post/detail",
    async (id, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/posts/${id}`);
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//Add Likes to post
export const toggleAddLikesToPost = createAsyncThunk(
    "post/like",
    async (postId, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/posts/likes`,
          { postId },
          config
        );
  
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
  //Add DisLikes to post
  export const toggleAddDisLikesToPost = createAsyncThunk(
    "post/dislike",
    async (postId, { rejectWithValue, getState, dispatch }) => {
      //get user token
      const user = getState()?.users;
      const { userAuth } = user;
      const config = {
        headers: {
          Authorization: `Bearer ${userAuth?.token}`,
        },
      };
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/posts/dislikes`,
          { postId },
          config
        );
  
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//slice
const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: 20
    },
    extraReducers: builder => {
        //create a post
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(resetCreateAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isCreated = false;
            state.postCreated = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = true;
            state.appErr = action?.payload.message;
            state.serverErr = action?.error?.message;
        });
        //Update post
        builder.addCase(updatePostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostEdit, (state, action) => {
            state.isUpdated = true;
        });
        builder.addCase(updatePostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isUpdated = false;
        });
        builder.addCase(updatePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    
        //Delete post
        builder.addCase(deletePostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostDelete, (state, action) => {
            state.isDeleted = true;
        });
        builder.addCase(deletePostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.isDeleted = false;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deletePostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //fetch all post
        builder.addCase(fetchPostsAction.pending, (state, action) => {
            state.loading = true; 
            state.appErr = undefined;
            state.serverErr = undefined;  
        });
        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postLists = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.loading = true;
            state.appErr = action?.payload.message;
            state.serverErr = action?.error?.message;
        });
        //fetch post Details
        builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
            state.postDetails = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //Likes
        builder.addCase(toggleAddLikesToPost.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(toggleAddLikesToPost.fulfilled, (state, action) => {
            state.likes = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(toggleAddLikesToPost.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //DisLikes
        builder.addCase(toggleAddDisLikesToPost.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
            state.dislikes = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default postSlice.reducer;