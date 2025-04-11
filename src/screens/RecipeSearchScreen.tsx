// src/screens/RecipeSearchScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IngredientInput from '../components/IngredientInput';
import RecipeList from '../components/RecipeList';
import { useRecipeContext } from '../contexts/RecipeContext';

const RecipeSearchScreen = () => {
  const { recipes } = useRecipeContext();
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (query: string) => {
    setIngredientQuery(query);

    const inputIngredients = query
      .toLowerCase()
      .split(',')
      .map((item) => item.trim());

    const matches = recipes.filter((recipe) =>
      inputIngredients.every((ingredient) =>
        recipe.ingredients.some((i) =>
          i.name.toLowerCase().includes(ingredient)
        )
      )
    );

    setFilteredRecipes(matches);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Recipes by Ingredients</Text>
      <IngredientInput onSearch={handleSearch} />
      <RecipeList recipes={ingredientQuery ? filteredRecipes : recipes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
});

export default RecipeSearchScreen;
