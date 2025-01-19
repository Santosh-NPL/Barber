import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, BackHandler, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { usePasswordChangeController } from '../viewmodels/ChangePasswordController';

const PasswordScreen: React.FC = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { mobileNo } = route.params;
  const { verifyPassword, loading, error, successMessage } = usePasswordChangeController();

  // State to manage password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Redirect to Login if successMessage is set
  useEffect(() => {
    if (successMessage) {
      navigation.navigate('Login', { message: successMessage });
    }
  }, [successMessage, navigation]);

  // Handle hardware back press to navigate to LoginScreen
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        t('confirm_exit'),
        t('navigate_to_login'),
        [
          { text: t('cancel'), style: 'cancel' },
          { text: t('yes'), onPress: () => navigation.navigate('LoginScreen') },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, t]);

  // Validation schema with Yup
  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('password_required'))
      .min(6, t('password_min_length')),
    confirmPassword: Yup.string()
      .required(t('confirm_password_required'))
      .oneOf([Yup.ref('password'), null], t('password_mismatch')),
  });

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={PasswordSchema}
      onSubmit={(values) => {
        verifyPassword(mobileNo, values.password, values.confirmPassword);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <SafeAreaView className="m-1 flex-1">
          {/* Header */}
          <View className="mt-2">
            <Text className="text-3xl">{t('change_password')}</Text>
          </View>

          {/* Image */}
          <View className="flex items-center my-10">
            <Image
              className="w-60 h-60"
              source={require('../assets/images/reset_password.png')}
            />
          </View>

          {/* Form Fields */}
          <View className="m-4 gap-3">
            <Text className="text-2xl">{t('enter_new_password')}</Text>

            {/* Password Input */}
            <View>
              <TextInput
                label={t('password')}
                mode="outlined"
                placeholder={t('placeholder_password')}
                secureTextEntry={!passwordVisible}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={!!(touched.password && errors.password)}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Input */}
            <View>
              <TextInput
                label={t('retype_password')}
                mode="outlined"
                placeholder={t('placeholder_password')}
                secureTextEntry={!confirmPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={confirmPasswordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  />
                }
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={!!(touched.confirmPassword && errors.confirmPassword)}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <Button mode="contained" onPress={handleSubmit}>
                  {t('submit')}
                </Button>
              )}
            </View>
          </View>

          {/* Error and Success Messages */}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  successText: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
