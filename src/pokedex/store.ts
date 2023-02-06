import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './components/counter/counterSlice';
import pokemonsReducer from './components/Home/pokemonSlice';

import { setupListeners } from '@reduxjs/toolkit/query/react';
import { pokemonService } from './services/pokemon.service';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
    [pokemonService.reducerPath]: pokemonService.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonService.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
