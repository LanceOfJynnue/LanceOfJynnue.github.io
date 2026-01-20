import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for an blog (adjust fields as needed)
export interface Blog {
  BlogId: number;
  UserId: number;
  Username: string;
  Created_At: string;
  Header: string;
  Body: string;
}

// Define the slice state type
interface ListState {
  blogs: Blog[];
  currentPage: number;
  blogsPerPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: ListState = {
  blogs: [],
  currentPage: 1,
  blogsPerPage: 10,
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchBlogs = createAsyncThunk<
  { blogs: Blog[]; totalPages: number; currentPage: number },
  number,
  { state: { list: ListState } }
>(
  'list/fetchBlogs',
  async (pageNumber, { getState }) => {
    const { list } = getState();
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${list.blogsPerPage}`
      // Replace with your actual API endpoint
    );
    // Assuming your API returns data and some way to determine total pages (e.g., in headers or body)
    // For jsonplaceholder, total count is in the 'x-total-count' header
    const totalCount = Number(response.headers['x-total-count']);
    const totalPages = Math.ceil(totalCount / list.blogsPerPage);

    return { blogs: response.data as Blog[], totalPages, currentPage: pageNumber };
  }
);

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<{ blogs: Blog[]; totalPages: number; currentPage: number }>) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const { setCurrentPage } = listSlice.actions;

export default listSlice.reducer;