// src/App.tsx
import React from 'react';
import { RecipeProvider } from './contexts/RecipeContext';
import { AppProvider } from './contexts/AppContext'; // <-- Add this
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <AppProvider> {/* Firebase Auth context goes here */}
      <RecipeProvider>
        <AppNavigator />
      </RecipeProvider>
    </AppProvider>
  );
};

export default App;
