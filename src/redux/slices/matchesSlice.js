import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://api.opendota.com/api';

// Define an async thunk for fetching matches data
export const fetchMatches = createAsyncThunk('matches/fetchMatches', async () => {
  const response = await axios.get(`${API_BASE_URL}/proMatches`);
  return response.data;
});

// Create the matches slice
const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default matchesSlice.reducer;
