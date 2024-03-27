import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../config/constant';

// Define an async thunk for fetching matches data
export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/proMatches`);
    return response.data;
  },
);

// Create the matches slice
const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectMatchesState = (state) => state.matches;
export default matchesSlice;
