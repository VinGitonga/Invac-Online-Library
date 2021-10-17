import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user/userSlice';
import { categorySlice } from './category/categorySlice';
import { bookSlice } from './book/bookSlice';

const userInfoFromStorage = sessionStorage.getItem('userInfo')
    ? JSON.parse(sessionStorage.getItem('userInfo'))
    : null;


export default configureStore({
    reducer: {
        user: userSlice.reducer,
        category: categorySlice.reducer,
        book: bookSlice.reducer
    },
    preloadedState: {
        user: {
            userInfo: userInfoFromStorage,
        }
    }
})
