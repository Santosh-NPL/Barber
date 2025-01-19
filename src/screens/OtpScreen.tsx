import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons'; // Import FontAwesome icons
import { useOtpController } from '../viewmodels/OtpController';

// Validation schema for OTP
const OtpSchema = Yup.object().shape({
  otp_number: Yup.string()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits'), // Ensures OTP is numeric and 6 digits
});

const OtpScreen: React.FC = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { message, mobileNo, title } = route.params; // Retrieve the mobile number from route params
  const { verifyOtp, loading, error, successMessage } = useOtpController();


   useEffect(() => {
      if (successMessage) {
        navigation.navigate('PasswordScreen', { message: successMessage, mobileNo: mobileNo, title: t('password') });
      }
    }, [successMessage, navigation]);

  return (
    <Formik
      initialValues={{ otp_number: '' }}
      validationSchema={OtpSchema}
      onSubmit={(values) => {
        verifyOtp(values.otp_number, mobileNo); // Submit OTP
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
              <Icon name="arrow-back-outline" size={30} color="#d51212" />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Display OTP Image */}
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/otp.png')} style={styles.image} />
          </View>

          {/* OTP Message */}
          <Text style={styles.message}>{t('otp_success_message', { mobileNo })}</Text>

          {/* OTP Input */}
          <View style={styles.inputContainer}>
            <TextInput
              label={t('otp')}
              mode="outlined"
              placeholder={t('placeholder_otp')}
              keyboardType="numeric"
              onChangeText={handleChange('otp_number')}
              onBlur={handleBlur('otp_number')}
              value={values.otp_number}
              error={!!(touched.otp_number && errors.otp_number)}
            />
            {touched.otp_number && errors.otp_number && (
              <Text style={styles.errorText}>{errors.otp_number}</Text>
            )}
          </View>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Button mode="contained" onPress={handleSubmit}>
                {t('proceed')}
              </Button>
            )}
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {successMessage && <Text style={styles.successText}>{successMessage}</Text>}
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginLeft: 10,
    color: '#333',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
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
