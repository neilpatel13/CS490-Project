import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUr1: '' });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints:(builder) => ({}),
});