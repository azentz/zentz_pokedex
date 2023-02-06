import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import PokemonDetail from '../PokemonDetail/PokemonDetail';
import { store } from '../../store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="pokemon">
            <Route path="" element={<Home />} />
            <Route path=":pokemonName">
              <Route index element={<PokemonDetail />} />
            </Route>
          </Route>

          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
