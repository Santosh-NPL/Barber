import "./global.css"
import './src/gesture-handler'; // Import the gesture handler file
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import i18next from './src/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './src/navigation/AuthNavigator'; // Import the AuthNavigator


const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    // Hide the splash screen after the app is loaded
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily:"Righteous",
  },
  input: {
    width: '100%',
  },
});
