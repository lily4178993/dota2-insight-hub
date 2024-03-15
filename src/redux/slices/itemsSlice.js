import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../config/constant';

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
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectItemsState = (state) => state.items;
export default itemsSlice;
