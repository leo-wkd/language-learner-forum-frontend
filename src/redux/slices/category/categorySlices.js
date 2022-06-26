import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

//action to redirect, userd to reset the state
export const resetEditAction = createAction('category/reset');
export const resetDeleteAction = createAction('category/reset-delete');
export const resetAddAction = createAction('category/reset-add');

//action
export const createCategoryAction = createAsyncThunk(
    '/category/create',
    async (category, {rejectWithValue, getState, dispatch}) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.post(
                `${baseUrl}/api/category`, 
                {
                    title: category?.title,
                }, 
                config);
            dispatch(resetAddAction());
            return data;
        } catch (error) {
            if(error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch categories
export const fetchCategoriesAction = createAsyncThunk(
    '/category/fetch',
    async (category, {rejectWithValue, getState, dispatch}) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/category`, config);
            return data;
        } catch (error) {
            if(error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//update categories
export const updateCategoryAction = createAsyncThunk(
    '/category/update',
    async (category, {rejectWithValue, getState, dispatch}) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.put(
                `${baseUrl}/api/category/${category?.id}`, {title: category?.title}, config);
            //dispatch action to reset the updatedCategory
            dispatch(resetEditAction());
            return data;
        } catch (error) {
            if(error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//delete categories
export const deleteCategoryAction = createAsyncThunk(
    '/category/delete',
    async (id, {rejectWithValue, getState, dispatch}) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.delete(
                `${baseUrl}/api/category/${id}`, config);
            dispatch(resetDeleteAction());
            return data;
        } catch (error) {
            if(error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch category details
export const fetchCategoryAction = createAsyncThunk(
    '/category/details',
    async (id, {rejectWithValue, getState, dispatch}) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`
            }
        }
        try {
            const { data } = await axios.get(
                `${baseUrl}/api/category/${id}`, config);
            console.log(data);
            return data;
        } catch (error) {
            if(error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//slices
const categorySlices = createSlice({
    name: 'category',
    initialState: {
        
    },
    extraReducers: builder => {
        //create
        builder.addCase(createCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        //dispatch action to redirect
        builder.addCase(resetAddAction, (state, action) => {
            state.isCreated = true;
        });
        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action?.payload;
            state.isCreated = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //fetch all
        builder.addCase(fetchCategoriesAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryList = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //update
        builder.addCase(updateCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        //dispatch action, reset state
        builder.addCase(resetEditAction, (state, action) => {
            state.isEdited = true;
        });
        builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.isEdited = false;
            state.updatedCategory = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(updateCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //delete
        builder.addCase(deleteCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        //dispatch reset action, reset state, or we cannot go into a category anymore
        builder.addCase(resetDeleteAction, (state, action) => {
            state.isDeleted = true;
        })
        builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.deletedCategory = action?.payload;
            state.isDeleted = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(deleteCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
        //fetch details
        builder.addCase(fetchCategoryAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });
    }
});

export default categorySlices.reducer;