// src/screens/LoginScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Button, Checkbox} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import { handelLogin } from '../viewmodels/LoginController';
import { useTranslation } from 'react-i18next';


const LoginScreen = ({ navigation }) => {

  const { t } = useTranslation();


  const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox

  const loginValidationSchema = yup.object().shape({
    mobileNo: yup
      .string()
      .matches(/^((98)|(97))[0-9]{8}$/, 'Enter a valid Nepali mobile number')
      .required('Mobile number is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const onLoginPress = async (values: {mobileNo: string; password: string}) => {
    setLoading(true);
    try {
      const response = await handelLogin(values.mobileNo, values.password);
      if (response) {
        Alert.alert('Success', 'Login successful');
        navigation.replace('Dashboard'); // Navigate to Dashboard
      }
    } catch (error: any) {
      console.log('Error:', error);

      // UI मा सही त्रुटि देखाउने
      if (error.status) {
        console.log('Status Code:', error.status);
        Alert.alert('Error', error.message || 'An unknown error occurred.');
        setApiErrors({form: error.message});
      } else {
        Alert.alert('Error', 'Network error or server unavailable.');
      }
    } finally {
      setLoading(false);
    }
  };


  // const handleLogin = () => {
  //   navigation.replace('Dashboard'); // Navigate to the Dashboard after login
  // };

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Formik
        initialValues={{mobileNo: '', password: ''}}
        validateOnMount={true}
        onSubmit={onLoginPress} // Use onLoginPress instead of handleLogin directly
        validationSchema={loginValidationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.content}>
              {/* Logo and Welcome Text */}
              <Image
                source={require('../assets/logo/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text className='text-yellow-600 text-4xl'>{t('welcome')}</Text>

              {/* Mobile Number Input */}
              <TextInput
                onBlur={handleBlur('mobileNo')}
                label={t('mobile_number')}
                mode="outlined"
                value={values.mobileNo}
                onChangeText={handleChange('mobileNo')}
                style={styles.input}
                keyboardType="phone-pad"
                placeholder={t('placeholder_mobile')}
              />
              {errors.mobileNo && touched.mobileNo && (
                <Text style={styles.errorText}>{errors.mobileNo}</Text>
              )}

              {/* Password Input */}
              <TextInput
                label={t('password')}
                mode="outlined"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
                placeholder={t('placeholder_password')}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Display API Error */}
              {apiErrors.form && (
                <Text style={styles.errorText}>{apiErrors.form}</Text>
              )}

              {/* Remember Me and Forgot Password */}
              <View style={styles.optionsContainer}>
                <View style={styles.rememberMeContainer}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                  />
                  <Text style={styles.rememberMeText}>{t('remember_me')}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text style={styles.forgotPasswordText}>
                    {t('forget_password')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={!isValid || loading}
                  style={styles.loginButton}>
                 {loading ? t('loading') : t('login')}
                </Button>
              </View>

              {/* Sign Up Link */}
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpText}>
                 {t('no_account')}{' '}
                  <Text style={styles.signUpLink}>{t('sign_up')}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10, // Space between the button and Sign Up link
  },
  loginButton: {
    paddingVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#333',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  signUpText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
  signUpLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});