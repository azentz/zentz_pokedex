import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react';

import App from './App';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, {wrapper: BrowserRouter});
}

test('renders learn react link', () => {
  renderWithRouter(<App />, { route: '/demo' });
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
