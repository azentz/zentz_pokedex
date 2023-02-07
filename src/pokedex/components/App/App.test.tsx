import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('../Home/Home', () => () => {
  return <div>MockHome</div>;
});

jest.mock('../PokemonDetail/PokemonDetail', () => () => {
  return <div>MockPokemonDetail</div>;
});

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, {wrapper: BrowserRouter});
}

test('renders Home page', () => {
  renderWithRouter(<App />, { route: '/' });
  const el = screen.getByText(/MockHome/i);
  expect(el).toBeInTheDocument();
});

test('renders PokemonDetail page', () => {
  renderWithRouter(<App />, { route: '/pokemon/name' });
  const el = screen.getByText(/MockPokemonDetail/i);
  expect(el).toBeInTheDocument();
});
