import { configureStore } from '@reduxjs/toolkit';
import {
  heroesSlice, itemsSlice, matchesSlice, playersSlice,
} from './slices';

const store = configureStore({
  reducer: {
    heroes: heroesSlice.reducer,
    items: itemsSlice.reducer,
    matches: matchesSlice.reducer,
    players: playersSlice.reducer,
  },
});

export default store;
