import React, {useEffect, useState} from 'react';
import classnames from 'classnames';
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
      setState({...state, loading: true});
      const res = await fetch(API_URL);
      const {data} = await res.json();
      setState({ ...state, data: data, loading: false, error: false });
    }
  
    try{
      getData()
    } catch(e) {
      setState({...state, error: true});
    }  
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
          <p className={classnames(styles.error, 'text text_type_main-large p-30')}>
            Что-то пошло не так, повторите попытку позже
          </p>
        )
      }
      
    </div>
  );
}

export default App;
