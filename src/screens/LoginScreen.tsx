// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAppContext } from '../contexts/AppContext';

const LoginScreen = () => {
  const { signIn, signUp, loading } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSigningUp) {
        await signUp(email, password);
        Alert.alert('Success', 'Account created!');
      } else {
        await signIn(email, password);
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message || 'Something went wrong');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSigningUp ? 'Sign Up' : 'Sign In'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isSigningUp ? 'Sign Up' : 'Sign In'} onPress={handleAuth} />
      <View style={styles.spacer} />
      <Button
        title={isSigningUp ? 'Switch to Sign In' : 'Need to Sign Up? Click Here'}
        onPress={() => setIsSigningUp(!isSigningUp)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  spacer: {
    height: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;