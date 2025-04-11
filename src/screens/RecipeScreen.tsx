// src/screens/RecipeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRecipeContext } from '../contexts/RecipeContext';

const RecipeScreen = () => {
  const route = useRoute();
  const { recipeId } = route.params as { recipeId: string };

  const { recipes } = useRecipeContext();
  const recipe = recipes.find((r) => r.id === recipeId);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {recipe.ingredients.map((ing, index) => (
        <Text key={index}>
          • {ing.quantity} {ing.unit} {ing.name}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions:</Text>
      {recipe.instructions.map((step) => (
        <Text key={step.step}>
          {step.step}. {step.instruction}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Cooking Time:</Text>
      <Text>{recipe.cookingTime} hour(s)</Text>

      <Text style={styles.sectionTitle}>Nutrition (per serving):</Text>
      <Text>Calories: {recipe.nutrition.calories} kcal</Text>
      <Text>Protein: {recipe.nutrition.protein} g</Text>
      <Text>Carbs: {recipe.nutrition.carbs} g</Text>
      <Text>Fat: {recipe.nutrition.fat} g</Text>
      <Text>Serving Size: {recipe.servingSize}</Text>
      <Text>Servings per Meal: {recipe.servings}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  sectionTitle: { marginTop: 16, fontWeight: 'bold', fontSize: 18 },
  error: { color: 'red', fontSize: 18, textAlign: 'center', marginTop: 40 },
});

export default RecipeScreen;
