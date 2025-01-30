import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authStorage } from '@/store/authStorage';
import { handleRandomJokeNotification } from '@/utils/functions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/types/Authentication';


export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormData) => {
    const user = authStorage.login(data.email, data.password);
    if (user) {
      authStorage.setCurrentUser(user);
      handleRandomJokeNotification();
      router.replace('/(tabs)/home');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="headlineLarge">Login</Text>
        
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
              />
              {errors.email && (
                <Text style={{ color: 'red' }}>{errors.email.message}</Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={!!errors.password}
              />
              {errors.password && (
                <Text style={{ color: 'red' }}>{errors.password.message}</Text>
              )}
            </>
          )}
        />

        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Login
        </Button>
        
        <Button mode="text" onPress={() => router.push('/register')}>
          Don't have an account? Register
        </Button>
      </View>
    </SafeAreaView>
  );
}