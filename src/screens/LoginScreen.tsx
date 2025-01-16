// src/screens/LoginScreen.tsx
import * as React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.replace('Dashboard'); // Navigate to the Dashboard after login
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;