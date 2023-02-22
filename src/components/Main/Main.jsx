import React, {useEffect} from 'react';
import  {useDispatch, useSelector } from 'react-redux'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { fetchIngredients } from '../../services/ingredientsSlice'

import styles from './Main.module.css'

function Main() {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.ingredients);
  
  useEffect(() => {
    try {
      dispatch(fetchIngredients())
    } catch(e){
      console.log(e)
    } 
  }, [dispatch])

  return ( 
      <div className={styles.wrapper}>
        <AppHeader />
        {
          !loading && !error && (<main className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>)  
        }
        {
          error && (
            <div className={styles.error}>
              <p className='text text_type_main-large pt-30 pb-4'>
                Что-то пошло не так, повторите попытку позже
              </p>
              <p className='text text_type_main-medium'>{error.message}</p>
            </div>
          )
        } 
      </div>
    
  );
}

export default Main;
