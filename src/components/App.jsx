import React from 'react';
import AppHeader from './AppHeader/AppHeader'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './BurgerConstructor/BurgerConstructor';
import data from '../utils/data.json'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
