import React from 'react';

import IngredientsProvider from '../../context/IngredientsProvider';
import OrderDataProvider from '../../context/OrderDataProvider';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Main from '../Main/Main'

function App() {
  return ( 
    <ErrorBoundary>
      <IngredientsProvider>
        <OrderDataProvider>
          <Main />
        </OrderDataProvider>
      </IngredientsProvider>
    </ErrorBoundary>
  );
}

export default App;
