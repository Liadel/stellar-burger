import React from 'react';

import IngredientsProvider from '../IngredientsProvider/IngredientsProvider';
import OrderDataProvider from '../OrderDataProvider/OrderDataProvider';
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
