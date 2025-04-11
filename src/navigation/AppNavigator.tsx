// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAppContext } from '../contexts/AppContext'; // <-- Use the context
import { RecipeProvider } from '../contexts/RecipeContext';
import LoginScreen from '../screens/LoginScreen'; // <-- Import login screen
import UserForm from '../components/UserForm';
import HomeScreen from '../screens/HomeScreen';
import RecipeSearchScreen from '../screens/RecipeSearchScreen';
import CustomRecipeFormScreen from '../screens/CustomRecipeFormScreen';
import RecipeListScreen from '../screens/RecipeListScreen';
import RecipeScreen from '../screens/RecipeScreen';
import { RootStackParamList } from '../types/RootStackParamList';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user } = useAppContext(); // 👈 Get current user from context

  return (
    <RecipeProvider>
      <NavigationContainer>
        {user ? (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="RecipeSearch" component={RecipeSearchScreen} />
            <Stack.Screen name="CustomRecipeForm" component={CustomRecipeFormScreen} />
            <Stack.Screen name="RecipeList" component={RecipeListScreen} />
            <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
          </Stack.Navigator>
        ) : (
          <LoginScreen /> // 👈 Show login if user not authenticated
        )}
      </NavigationContainer>
    </RecipeProvider>
  );
};

export default AppNavigator;
