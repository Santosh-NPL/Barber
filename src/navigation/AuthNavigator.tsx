// src/navigation/AuthNavigator.tsx
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen'; // Import your login screen
import DashboardNavigator from './DashboardNavigator'; // Import the dashboard navigator

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardNavigator} />
    </Stack.Navigator>
  );
};