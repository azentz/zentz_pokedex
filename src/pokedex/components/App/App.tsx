import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import { Counter } from '../counter/Counter';
import { store } from '../../store';

import logo from './logo.svg';
import styles from './App.module.scss';

const App: React.FC = () => {
  const { t } = useTranslation();

  const Demo = (
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
  );

  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/demo" element={Demo} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
