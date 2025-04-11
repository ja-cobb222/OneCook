// src/screens/EditRecipeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/core'; // Add this import for RouteProp
import { RootStackParamList } from '../types/RootStackParamList';
import { Recipe } from '../types/Recipe'; // Import Recipe type
import { recipes } from '../data/mockRecipes'; // Assuming mock recipes data

// Define the type for the route params using RouteProp
type EditRecipeScreenRouteProp = RouteProp<RootStackParamList, 'RecipeScreen'>;

const EditRecipeScreen = () => {
  const { params } = useRoute<EditRecipeScreenRouteProp>(); // Define the route type
  const navigation = useNavigation();
  const { recipeId } = params; // Get the recipeId from the route params

  // Get the recipe by ID from the mock data
  const recipe = recipes.find((r) => r.id === recipeId);

  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookingTime, setCookingTime] = useState('');

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setIngredients(recipe.ingredients.join(', '));
      setInstructions(recipe.instructions.join('\n'));
      setCookingTime(recipe.cookingTime.toString());
    }
  }, [recipe]);

  const handleSave = () => {
    // Here you would save the updated recipe (to state or a database)
    console.log('Recipe saved:', { name, ingredients, instructions, cookingTime });
    navigation.goBack(); // Go back to the previous screen after saving
  };

  if (!recipe) {
    return <Text>Recipe not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Recipe</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Recipe Name"
      />
      <Text>Ingredients</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Ingredients (comma-separated)"
      />
      <Text>Instructions</Text>
      <TextInput
        style={styles.input}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Instructions"
      />
      <Text>Cooking Time (minutes)</Text>
      <TextInput
        style={styles.input}
        value={cookingTime}
        onChangeText={setCookingTime}
        keyboardType="numeric"
        placeholder="Cooking Time"
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default EditRecipeScreen;
