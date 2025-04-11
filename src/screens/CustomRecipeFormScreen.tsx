// src/screens/CustomRecipeFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Recipe, Ingredient, Instruction } from '../types/Recipe';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useRecipeContext } from '../contexts/RecipeContext';
import { RootStackParamList } from '../types/RootStackParamList';

type RouteParams = RouteProp<RootStackParamList, 'CustomRecipeForm'>;

const CustomRecipeFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteParams>();
  const { addRecipe, deleteRecipe } = useRecipeContext();

  const editingRecipe: Recipe | undefined = route.params?.recipe;

  const [name, setName] = useState(editingRecipe?.name || '');
  const [ingredients, setIngredients] = useState<Ingredient[]>(editingRecipe?.ingredients || []);
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: '' });
  const [instructions, setInstructions] = useState<Instruction[]>(editingRecipe?.instructions || []);
  const [newStep, setNewStep] = useState('');
  const [cookingTime, setCookingTime] = useState(
    editingRecipe?.cookingTime?.toString() || ''
  );

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.unit) {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient({ name: '', quantity: '', unit: '' });
    } else {
      Alert.alert("Incomplete Ingredient", "Please fill out all ingredient fields.");
    }
  };

  const addInstruction = () => {
    if (newStep) {
      const stepNum = instructions.length + 1;
      setInstructions([...instructions, { step: stepNum, instruction: newStep }]);
      setNewStep('');
    }
  };

  const handleSubmit = () => {
    if (!name || ingredients.length === 0 || instructions.length === 0 || !cookingTime) {
      Alert.alert("Missing Fields", "Please complete all fields before submitting.");
      return;
    }

    const newRecipe: Recipe = {
      id: editingRecipe ? editingRecipe.id : Date.now().toString(),
      name,
      ingredients,
      instructions,
      cookingTime: parseFloat(cookingTime),
      cuisine: editingRecipe?.cuisine || 'Custom',
      nutrition: editingRecipe?.nutrition || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
      servings: editingRecipe?.servings || 4,
      servingSize: editingRecipe?.servingSize || '1 serving',
      isCustom: true,
    };

    if (editingRecipe) {
      deleteRecipe?.(editingRecipe.id); // Replace the old one
    }

    addRecipe(newRecipe);
    Alert.alert(
      editingRecipe ? 'Recipe Updated!' : 'Recipe Added!',
      `${name} has been ${editingRecipe ? 'updated' : 'created'}.`
    );

    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        {editingRecipe ? 'Edit Your Recipe' : 'Create Your Custom Recipe'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Recipe Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.subheading}>Add Ingredient</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newIngredient.name}
        onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={newIngredient.quantity}
        onChangeText={(text) => setNewIngredient({ ...newIngredient, quantity: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit (e.g., cups, tbsp)"
        value={newIngredient.unit}
        onChangeText={(text) => setNewIngredient({ ...newIngredient, unit: text })}
      />
      <Button title="Add Ingredient" onPress={addIngredient} />

      <View style={{ marginTop: 16 }}>
        <Text style={styles.sectionTitle}>Added Ingredients:</Text>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <Text style={styles.ingredientText}>
              {ingredient.quantity} {ingredient.unit} of {ingredient.name}
            </Text>
            <Button
              title="Delete"
              color="red"
              onPress={() => {
                const updatedIngredients = [...ingredients];
                updatedIngredients.splice(index, 1);
                setIngredients(updatedIngredients);
              }}
            />
          </View>
        ))}
      </View>

      <Text style={styles.subheading}>Add Instruction</Text>
      <TextInput
        style={styles.input}
        placeholder="Instruction Step"
        value={newStep}
        onChangeText={setNewStep}
      />
      <Button title="Add Step" onPress={addInstruction} />

      {instructions.length > 0 && (
        <View style={styles.tableContainer}>
          <Text style={styles.sectionTitle}>Instruction Steps Overview:</Text>
          {instructions.map((step) => (
            <View key={step.step} style={styles.tableRow}>
              <Text style={styles.tableCellStep}>Step {step.step}</Text>
              <Text style={styles.tableCellText}>{step.instruction}</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.subheading}>Cooking Time (in hours)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 6"
        keyboardType="numeric"
        value={cookingTime}
        onChangeText={setCookingTime}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title={editingRecipe ? 'Update Recipe' : 'Submit Recipe'}
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 100 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  subheading: { marginTop: 16, fontSize: 18, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    padding: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },
  ingredientText: {
    flex: 1,
    marginRight: 8,
  },
  tableContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  tableCellStep: {
    width: 70,
    fontWeight: 'bold',
  },
  tableCellText: {
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default CustomRecipeFormScreen;
