import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../supabaseClient';
import type { user_table, blogs_table } from '../database.types.ts';
const user_id_str = sessionStorage.getItem('currentUserId');
const user_id: number = user_id_str ? parseInt(user_id_str, 10) : 0;

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  baseQuery: fakeBaseQuery(), // Use fakeBaseQuery as Supabase has its own client
  endpoints: (builder) => ({
    getUser: builder.query<user_table[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('user_table').select('*');
        if (error) throw error;
        return { data };
      },
    }),
    getBlog: builder.query<blogs_table[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('blogs_table').select('*');
        if (error) throw error;
        return { data };
      },
    }),
    getMyBlog: builder.query<blogs_table[], void>({
      async queryFn() {
        const { data, error } = await supabase.from('blogs_table').select('*').eq('user_id', user_id);
        if (error) throw error;
        return { data };
      },
    }),
  }),
});

export const { useGetUserQuery, useGetBlogQuery, useGetMyBlogQuery } = supabaseApi;