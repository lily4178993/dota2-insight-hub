import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://api.opendota.com/api';

// Define an async thunk for fetching Pro Players data
export const fetchPlayers = createAsyncThunk('proPlayers/fetchPlayers', async () => {
  const response = await axios.get(`${API_BASE_URL}/proPlayers`);
  return response.data;
});

// Create the players slice
const playersSlice = createSlice({
  name: 'players',
  initialState: {
    players: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default playersSlice.reducer;
