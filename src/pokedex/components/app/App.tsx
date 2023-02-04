import React from 'react';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Counter } from '../counter/Counter';
import { store } from '../../store';
import logo from './logo.svg';
import styles from './App.module.scss';

function App() {
  const { t } = useTranslation();

  return (
    <Provider store={store}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload. {t('pokedex')}
          </p>
          <a
            className={styles.link}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Counter />
        </header>
      </div>
    </Provider>
  );
}

export default App;
