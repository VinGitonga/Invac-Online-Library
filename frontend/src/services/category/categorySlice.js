import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = 'http://localhost:3005/api'

export const createCategory = createAsyncThunk(
    'categories/create',
    async (categoryData, thunkAPI) => {
        try {
            const {
                user: { userInfo }
            } = thunkAPI.getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            const response = await axios.post(`${baseURL}/categories/create_cat`, categoryData, config);
            const data = response.data;

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(data)
            } else
                return data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const listCategories = createAsyncThunk(
    'categories/list',
    async (_, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const response = await axios.get(`${baseURL}/categories/list`, config);
            
            const data = response.data;

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const removeCategory = createAsyncThunk(
    'categories/remove',
    async (categoryId, thunkAPI) => {
        try {
            const {
                user: { userInfo }
            } = thunkAPI.getState();

            const config = {
                headers: {
                    "Accept": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }

            await axios.delete(`${baseURL}/categories/${categoryId}`, config);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    categories: []
}

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearState: state => {
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: {
        [createCategory.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [createCategory.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message
        },
        [createCategory.pending]: state => {
            state.isFetching = true;
        },
        [listCategories.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.categories = payload;
        },
        [listCategories.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [listCategories.pending]: state => {
            state.isFetching = true;
        },
        [removeCategory.fulfilled]: state => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [removeCategory.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message
        },
        [removeCategory.pending]: state => {
            state.isFetching = true;
        }
    }
})

export const { clearState } = categorySlice.actions;

export const categorySelector = state => state.category;
