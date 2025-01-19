// src/navigation/AuthNavigator.tsx
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'; // Import your login screen
import DashboardNavigator from './DashboardNavigator'; // Import the dashboard navigator
import ForgetPassword from '../screens/ForgetPassword';
import RegisterScreen from '../screens/RegisterScreen';
import OtpScreen from '../screens/OtpScreen';
import PasswordScreen from '../screens/PasswordScreen';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword}  options={{ headerShown: false }}  />
      <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }}  />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen}  options={{ headerShown: false }}  />
      <Stack.Screen name="Register" component={RegisterScreen}  />
      <Stack.Screen name="Dashboard" component={DashboardNavigator} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
};