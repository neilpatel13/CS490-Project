import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import { taskApiSlice } from './slices/taskApiSlice';
import refreshReducer from './slices/refreshSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [taskApiSlice.reducerPath]: taskApiSlice.reducer,
        auth: authReducer,
        tasks: taskReducer,
        refresh: refreshReducer, // Add this line
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware, taskApiSlice.middleware),
    devTools: true,
});

export default store;