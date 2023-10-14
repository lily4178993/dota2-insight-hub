import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://api.opendota.com/api';

// Define an async thunk for fetching heroes data
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const response = await axios.get(`${API_BASE_URL}/heroStats`);
  return response.data;
});

// Create the heroes slice
const heroesSlice = createSlice({
  name: 'heroes',
  initialState: {
    heroes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default heroesSlice.reducer;
