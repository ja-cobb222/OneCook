// src/components/IngredientInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  onSearch: (query: string) => void;
}

const IngredientInput = ({ onSearch }: Props) => {
  const [input, setInput] = useState('');

  const handlePress = () => {
    onSearch(input);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="e.g. chicken, rice, onion"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Search" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 8,
    borderRadius: 5,
  },
});

export default IngredientInput;
