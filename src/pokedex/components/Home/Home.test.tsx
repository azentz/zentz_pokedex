import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import Home from './Home';
import { store } from '../../store';


jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<Provider store={store}>{ ui }</Provider>, {wrapper: BrowserRouter});
}

describe('Home', () => {
   describe('when data loading', () => {
    test('renders loading indicator', () => {
      renderWithRouter(<Home />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });
  
  describe('when loading error', () => {
    test('renders error message', () => {
      // TODO: Figure out how to mock api calls
    });
  });
  
  describe('when data loaded', () => {
    test('renders search bar', () => {
      // TODO: Figure out how to mock api calls
    });

    describe('when no results', () => {
      test('renders no results message', () => {
        // TODO: Figure out how to mock api calls
      });
    });
  
    describe('when has results', () => {
      test('renders results', () => {
        // TODO: Figure out how to mock api calls
      });

      test('renders load more button', () => {
        // TODO: Figure out how to mock api calls
      });
    });
  });
});
