import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://api.opendota.com/api';

// Define an async thunk for fetching items data
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get(`${API_BASE_URL}/constants/items`);
  const itemsData = response.data;

  // Convert the object into an array with key-value pairs
  const itemsArray = Object.entries(itemsData).map(([key, value]) => ({
    key,
    ...value,
  }));

  return itemsArray;
});

// Create the items slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
