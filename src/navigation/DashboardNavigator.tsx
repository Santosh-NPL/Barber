// src/navigation/DashboardNavigator.tsx
import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'; // Import your home screen
import SettingsScreen from '../screens/SettingsScreen'; // Import your settings screen
import ProfileScreen from '../screens/ProfileScreen'; // Import your profile screen

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DashboardTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const DashboardNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DashboardTabs" component={DashboardTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DashboardNavigator;