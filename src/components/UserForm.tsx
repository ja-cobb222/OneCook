import React, { useState } from 'react';
import { TextInput, Button, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useAppContext } from '../contexts/AppContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';

type UserFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserForm'>;

const UserForm = () => {
  const [name, setName] = useState('');
  const { setUser } = useAppContext();
  const navigation = useNavigation<UserFormScreenNavigationProp>();

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('@user_name', name);  // Save to AsyncStorage
      setUser(name);  // Update context
      setName('');    // Clear input
      navigation.navigate('Home');  // Navigate after saving
    } catch (error) {
      console.error('Error saving user name to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Your Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default UserForm;