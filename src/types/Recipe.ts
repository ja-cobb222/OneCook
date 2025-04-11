export type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
};

export type Instruction = {
  step: number;
  instruction: string;
};

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  cookingTime: number;
  cuisine: string;
  nutrition: Nutrition;
  servings: number;
  servingSize: string;
  isCustom?: boolean; 
  isFavorite?: boolean;
}
