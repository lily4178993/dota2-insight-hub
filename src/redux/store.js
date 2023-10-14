import { configureStore/* , getDefaultMiddleware */ } from '@reduxjs/toolkit';
/* import logger from 'redux-logger'; */
import heroReducer from './slices/heroesSlice';
import itemReducer from './slices/itemsSlice';
import matchReducer from './slices/matchesSlice';
import playerReducer from './slices/playersSlice';

const store = configureStore({
  reducer: {
    heroes: heroReducer,
    items: itemReducer,
    matches: matchReducer,
    players: playerReducer,
  },
  /* middleware: [...getDefaultMiddleware(), logger], */
});

export default store;
