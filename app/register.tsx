
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
import { authStorage } from '@/store/authStorage';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData, registerSchema } from '@/types/Authentication';



export default function Register() {
  const { 
    control, 
    handleSubmit, 
    formState: { errors },
    setError 
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: RegisterFormData) => {
    const users = authStorage.getUsers();
    if (users.some(user => user.email === data.email)) {
      setError('email', {
        type: 'manual',
        message: 'Email already registered'
      });
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    
    authStorage.saveUser(newUser);
    authStorage.setCurrentUser(newUser);
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, gap: 16 }}>
        <Text variant="headlineLarge">Register</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <>
              <TextInput
                label="Name"
                value={value}
                onChangeText={onChange}
                error={!!errors.name}
              />
              {errors.name && (
                <Text style={{ color: 'red' }}>{errors.name.message}</Text>
              )}
            </>
          )}
        />

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
          Register
        </Button>

        <Button mode="text" onPress={() => router.push('/login')}>
          Already have an account? Login
        </Button>
      </View>
    </SafeAreaView>
  );
}