// frontend/src/slices/taskApiSlice.js

import { apiSlice } from './apiSlice';

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (date) => `/api/tasks?date=${date}`,
    }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: '/api/tasks',
        method: 'POST',
        body: newTask,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
} = taskApiSlice;
