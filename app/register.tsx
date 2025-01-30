// app/register.tsx
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { authStorage } from '@/store/authStorage';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    const users = authStorage.getUsers();
    if (users.some(user => user.email === email)) {
      setError('Email already registered');
      return;
    }

    const newUser = { name, email, password };
    authStorage.saveUser(newUser);
    authStorage.setCurrentUser(newUser);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="headlineLarge">Register</Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <Button mode="contained" onPress={handleRegister}>
          Register
        </Button>
        <Button mode="text" onPress={() => router.push('/login')}>
          Already have an account? Login
        </Button>
      </View>
    </SafeAreaView>
  );
}