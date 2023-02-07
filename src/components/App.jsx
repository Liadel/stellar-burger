import React from 'react';
import AppHeader from './AppHeader/AppHeader'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>
        main
      </main>
    </div>
  );
}

export default App;
