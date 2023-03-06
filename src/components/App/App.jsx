import React from 'react';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Main from '../Main/Main'

function App() {
  return ( 
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

export default App;
