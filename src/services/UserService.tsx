// src/services/UserService.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save username locally
export const saveUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem('@user_username', username);
  } catch (e) {
    console.error('Failed to save username', e);
  }
};

// Function to get username locally
export const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem('@user_username');
    return username;
  } catch (e) {
    console.error('Failed to fetch username', e);
    return null;
  }
};

// Optionally, clear username when the user logs out
export const clearUsername = async () => {
  try {
    await AsyncStorage.removeItem('@user_username');
  } catch (e) {
    console.error('Failed to clear username', e);
  }
};
