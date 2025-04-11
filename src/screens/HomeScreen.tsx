// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAppContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const { user } = useAppContext();  // Get user from context
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Handle navigation to RecipeSearch screen
  const handleGoToRecipeSearch = () => {
    navigation.navigate('RecipeSearch');  // Navigate to RecipeSearchScreen
  };

  // Handle navigation to Custom Recipe screen
  const handleCreateCustomRecipe = () => {
    navigation.navigate('CustomRecipeForm');  // Navigate to CustomRecipeFormScreen
  };

  // Handle navigation to Recipe List screen
  const handleGoToRecipeList = () => {
    navigation.navigate('RecipeList');  // Navigate to RecipeListScreen
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {String(user)}!</Text>
          {/* Only show the buttons if the user is logged in */}
          <View style={styles.buttonContainer}>
            <Button title="Go to Recipe Search" onPress={handleGoToRecipeSearch} />
            <View style={styles.spacer} />
            <Button title="Create Custom Recipe" onPress={handleCreateCustomRecipe} />
            <View style={styles.spacer} />
            <Button title="Go to Recipe List" onPress={handleGoToRecipeList} />  {/* New Button */}
          </View>
        </>
      ) : (
        <Text style={styles.text}>Please log in to view your recipe search.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,  // Adds space above the buttons
  },
  spacer: {
    marginBottom: 10, // Adds space between the buttons
  },
});

export default HomeScreen;
