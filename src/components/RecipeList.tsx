// src/components/RecipeList.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Recipe } from '../types/Recipe';
import { useNavigation } from '@react-navigation/native';
import { useRecipeContext } from '../contexts/RecipeContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';

interface Props {
  recipes: Recipe[];
  onRecipeDeleted?: () => void;
}

type NavigationProp = StackNavigationProp<RootStackParamList>;

const RecipeList = ({ recipes, onRecipeDeleted }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { deleteRecipe, toggleFavorite } = useRecipeContext();

  const handleEdit = (recipe: Recipe) => {
    navigation.navigate('CustomRecipeForm', { recipe });
  };

  const handleDelete = (recipeId: string) => {
    deleteRecipe?.(recipeId);
    onRecipeDeleted?.();
  };

  const handleViewRecipe = (recipeId: string) => {
    navigation.navigate('RecipeScreen', { recipeId });
  };

  const handleToggleFavorite = (recipeId: string) => {
    toggleFavorite?.(recipeId);
  };

  if (recipes.length === 0) {
    return <Text style={styles.noMatch}>No matching recipes found.</Text>;
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleViewRecipe(item.id)}>
          <View style={styles.recipeCard}>
            <View style={styles.headerRow}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <Button
                title={item.isFavorite ? '★' : '☆'}
                onPress={() => handleToggleFavorite(item.id)}
              />
            </View>
            <Text style={styles.ingredients}>
              Ingredients: {item.ingredients.map((i) => i.name).join(', ')}
            </Text>

            {item.isCustom && (
              <View style={styles.buttonRow}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  recipeCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    borderRadius: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredients: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  noMatch: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default RecipeList;
