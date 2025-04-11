// src/services/RecipeService.ts
import { Recipe } from '../types/Recipe';

// Mock data for recipes (temporary, to be replaced by Firebase later)
export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Bolognese',
    ingredients: [
      { name: 'Spaghetti', quantity: '200', unit: 'grams' },
      { name: 'Ground Beef', quantity: '500', unit: 'grams' },
      { name: 'Tomato Sauce', quantity: '1', unit: 'cup' },
      { name: 'Garlic', quantity: '2', unit: 'cloves' }
    ],
    instructions: [
      { step: 1, instruction: 'Boil the spaghetti in salted water.' },
      { step: 2, instruction: 'Cook the ground beef in a pan.' },
      { step: 3, instruction: 'Add garlic and tomato sauce to the beef.' },
      { step: 4, instruction: 'Mix the sauce with the spaghetti and serve.' }
    ],
    cookingTime: 1,  // 1 hour
  },
  {
    id: '2',
    name: 'Grilled Cheese Sandwich',
    ingredients: [
      { name: 'Bread', quantity: '2', unit: 'slices' },
      { name: 'Cheese', quantity: '2', unit: 'slices' },
      { name: 'Butter', quantity: '1', unit: 'tbsp' }
    ],
    instructions: [
      { step: 1, instruction: 'Butter both sides of the bread.' },
      { step: 2, instruction: 'Place cheese between the slices of bread.' },
      { step: 3, instruction: 'Grill the sandwich until golden brown on both sides.' }
    ],
    cookingTime: 0.25,  // 15 minutes
  },
  {
    id: '3',
    name: 'Chicken Salad',
    ingredients: [
      { name: 'Chicken Breast', quantity: '1', unit: 'piece' },
      { name: 'Lettuce', quantity: '2', unit: 'cups' },
      { name: 'Tomatoes', quantity: '1', unit: 'tomato' },
      { name: 'Olive Oil', quantity: '1', unit: 'tbsp' }
    ],
    instructions: [
      { step: 1, instruction: 'Grill the chicken breast.' },
      { step: 2, instruction: 'Chop the lettuce and tomato.' },
      { step: 3, instruction: 'Mix the grilled chicken, lettuce, and tomato.' },
      { step: 4, instruction: 'Drizzle olive oil and toss the salad.' }
    ],
    cookingTime: 0.5,  // 30 minutes
  },
  {
    id: '4',
    name: 'Vegetable Stir Fry',
    ingredients: [
      { name: 'Broccoli', quantity: '1', unit: 'cup' },
      { name: 'Carrots', quantity: '2', unit: 'pieces' },
      { name: 'Bell Peppers', quantity: '2', unit: 'pieces' },
      { name: 'Soy Sauce', quantity: '2', unit: 'tbsp' }
    ],
    instructions: [
      { step: 1, instruction: 'Chop the vegetables into bite-sized pieces.' },
      { step: 2, instruction: 'Stir fry the vegetables in a pan with soy sauce.' },
      { step: 3, instruction: 'Serve hot with rice or noodles.' }
    ],
    cookingTime: 0.75,  // 45 minutes
  },
  // More recipes...
];

class RecipeService {
  // Function to fetch all recipes (replace with Firebase call later)
  async getRecipes(): Promise<Recipe[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(recipes), 1000);  // Simulate async fetching
    });
  }

  // Function to get a recipe by its ID (replace with Firebase call later)
  async getRecipeById(recipeId: string): Promise<Recipe | null> {
    const recipe = recipes.find((rec) => rec.id === recipeId);
    return recipe || null;
  }
}

export const recipeService = new RecipeService();
