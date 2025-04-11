import { Recipe } from '../types/Recipe';

export type RootStackParamList = {
  UserForm: undefined;
  Home: undefined;
  RecipeSearch: undefined;
  RecipeScreen: { recipeId: string };
  RecipeDetail: { recipeId: string };
  CustomRecipeForm: { recipe?: Recipe }; 
  EditRecipe: { recipeId: string };
  RecipeList: undefined;
};
