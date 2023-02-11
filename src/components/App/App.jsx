import React, {useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import {API_URL} from '../../constants'
import styles from './App.module.css'

function App() {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: false
  })
  useEffect(() => {
    const getData = async () => {
      try {
        setState({...state, loading: true});
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Ответ сети был не ok.')
        }
        const {data} = await res.json();
        setState({ ...state, data: data, loading: false});
      } catch(e) {
        setState({...state, error: e});
      }    
    }
    getData()

  }, [])

  return (
    <div className={styles.wrapper}>
      <AppHeader />
      {
        state.data && !state.loading && !state.error && (
          <main className={styles.main}>
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
          </main>
        )
      }
      {
        state.error && (
          <div className={styles.error}>
            <p className='text text_type_main-large pt-30 pb-4'>
              Что-то пошло не так, повторите попытку позже
            </p>
            <p className='text text_type_main-medium'>{state.error.message}</p>
          </div>
        )
      }
      
    </div>
  );
}

export default App;
