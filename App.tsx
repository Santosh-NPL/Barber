import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import fontfamily from './src/constant/fontfamily';

const App: React.FC = () => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Hide the splash screen after the app is loaded
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Atithisewa</Text>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
      </View>
    </PaperProvider>
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
