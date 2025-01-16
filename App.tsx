import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import fontfamily from './src/constant/fontfamily';
import i18next from './src/i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    // Hide the splash screen after the app is loaded
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18next}>
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>{t('login')}</Text>
        <TextInput
          label={t('password')}
          value={t('password')}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
      </View>
    </PaperProvider>
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
