import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import { REACT_APP_API_BASE_URL } from '../util';

export const createBook = createAsyncThunk(
    'books/create',
    async (bookData, thunkAPI) => {
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

            const response = await axios.post(`${REACT_APP_API_BASE_URL}/books1/create`, bookData, config);
            let data = response.data;

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(data);
            } else
                return data;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const listBooks = createAsyncThunk(
    "books/list",
    async (keyword="", thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.get(`${REACT_APP_API_BASE_URL}/books1/all?keyword=${keyword}`, config);
            let data = response.data;
            console.log(data)
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const detailBook = createAsyncThunk(
    'books/detail',
    async (bookId, thunkAPI) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.get(`${REACT_APP_API_BASE_URL}/books1/read/${bookId}`, config);
            let data = response.data;
            console.log(data)

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const removeBook = createAsyncThunk(
    'books/remove',
    async (bookId, thunkAPI) => {
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

            await axios.delete(`${REACT_APP_API_BASE_URL}/books1/${bookId}`, config);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const updateBook = createAsyncThunk(
    'books/update',
    async ({ bookId, bookData }, thunkAPI) => {
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

            const response = await axios.put(`${REACT_APP_API_BASE_URL}/books1/update_book/${bookId}`, bookData, config);
            let data = response.data;

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(data)
            } else
                return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const createBookReview = createAsyncThunk(
    'books/review',
    async ({ bookId, bookReview }, thunkAPI) => {
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

            const response = await axios.post(`${REACT_APP_API_BASE_URL}/books1/create_review/${bookId}`, bookReview, config);
            let data = response.data;

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(data)
            } else
                return data

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

export const fetchComments = createAsyncThunk(
    'books/comments',
    async (bookId, thunkAPI) => {
        try{
            const config = {
                headers: {
                    "Content-Type":"application/json"
                }
            }

            const response = await axios.get(`${REACT_APP_API_BASE_URL}/books1/comments/${bookId}`, config);
            let data = await response.data;

            return data;
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    books: [],
    book: {},
    comments:[]
};



export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        clearState: state => {
            state.isFetching = false;
            state.isSuccess = false;
            state.isError = false;
        },
    },
    extraReducers: {
        [createBook.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [createBook.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [createBook.pending]: (state) => {
            state.isFetching = true;
        },
        [listBooks.pending]: (state) => {
            state.isFetching = true;
        },
        [listBooks.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.books = payload;
        },
        [listBooks.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message
        },
        [detailBook.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.book = payload;
        },
        [detailBook.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [detailBook.pending]: (state) => {
            state.isFetching = true;
        },
        [removeBook.fulfilled]: (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [removeBook.pending]: state => {
            state.isFetching = true;
        },
        [removeBook.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message
        },
        [updateBook.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [updateBook.pending]: state => {
            state.isFetching = true;
        },
        [updateBook.fulfilled]: state => {
            state.isFetching = false;
            state.isSuccess = true;
        },
        [createBookReview.fulfilled]: state => {
            state.isFetching = false;
            state.isSuccess = true
        },
        [createBookReview.pending]: state => {
            state.isFetching = true;
        },
        [createBookReview.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [fetchComments.fulfilled]: (state, {payload}) =>{
            state.isFetching = false;
            state.isSuccess = true;
            state.comments = payload;
        },
        [fetchComments.pending]: state => {
            state.isFetching = true;
        },
        [fetchComments.rejected]: (state, {payload}) => {
            state.isError = true;
            state.isFetching = false;
            state.errorMessage = payload.message;
        }
    }
})

export const { clearState } = bookSlice.actions;

export const bookSelector = state => state.book;