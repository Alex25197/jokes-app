// app/login.tsx
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authStorage } from '@/store/authStorage';
import { handleRandomJokeNotification } from '@/utils/functions';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = authStorage.login(email, password);
    if (user) {
      authStorage.setCurrentUser(user);
      handleRandomJokeNotification();
      router.replace('/(tabs)/home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="headlineLarge">Login</Text>
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
        <Button mode="contained" onPress={handleLogin}>
          Login
        </Button>
        <Button mode="text" onPress={() => router.push('/register')}>
          Don't have an account? Register
        </Button>
      </View>
    </SafeAreaView>
  );
}