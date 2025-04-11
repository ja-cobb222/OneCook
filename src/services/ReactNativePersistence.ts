// src/services/ReactNativePersistence.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Persistence } from 'firebase/auth';

class ReactNativePersistence implements Persistence {
  readonly type = 'LOCAL'; // <- just use the string literal

  async set(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async get(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }
}

export const reactNativePersistence = new ReactNativePersistence();
