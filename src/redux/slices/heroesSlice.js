import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../config/constant';

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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectHeroesState = (state) => state.heroes;
export default heroesSlice;
