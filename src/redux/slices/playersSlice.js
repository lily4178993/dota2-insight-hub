import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../config/constant';

// Define an async thunk for fetching Pro Players data
export const fetchPlayers = createAsyncThunk(
  'proPlayers/fetchPlayers',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/proPlayers`);
    return response.data;
  },
);

// Create the players slice
const playersSlice = createSlice({
  name: 'players',
  initialState: {
    players: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectPlayersState = (state) => state.players;
export default playersSlice;
