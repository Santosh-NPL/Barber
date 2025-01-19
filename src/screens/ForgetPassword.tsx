import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { mobileVerificationController } from '../viewmodels/MobileVerificationController'; 
import { Formik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons'; // Import FontAwesome icons

const ForgetPassword: React.FC = ({navigation}) => {
const { t } = useTranslation();
  const { loading, responseMessage, error, verifyMobile, validationErrors, mobileNumber } = mobileVerificationController();

  const mobileValidationSchema = yup.object().shape({
    mobileNo: yup
      .string()
      .matches(/^((98)|(97))[0-9]{8}$/, 'Enter a valid Nepali mobile number') // Validation for Nepali mobile numbers
      .required('Mobile number is required'),
  });

  const onSubmit = async (values: { mobileNo: string }) => {
    await verifyMobile(values.mobileNo);
  };

  useEffect(() => {
    if (responseMessage) {
      navigation.navigate('OtpScreen', { message: responseMessage, mobileNo: mobileNumber, title: t('otp') });
    }
  }, [responseMessage, navigation]);

    return (
        <SafeAreaView style={styles.container}>
          <View className="flex-row items-center justify-between mb-5 mt-2">
          <View className="flex-row items-center">
            <Image
              source={require('../assets/logo/logo.png')}
              className="w-16 h-16 mr-2"
            />
            <Text className="text-3xl font-bold mt-1 p-2">{t('atithisewa')}</Text>
          </View>

          {/* Cross icon to navigate to Login screen */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Icon name="close" size={30} color="#d51212" />
          </TouchableOpacity>
        </View>
        <View className='mt-3 ml-2'>
            <Text className='text-4xl pt-3 ml-0'> {t('forget_password')} </Text>
            <Text className='ml-2'>{t('otp_message')}</Text>
          </View>
          
          {/* Display OTP Image */}
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/mobile_verify.png')} style={styles.image} />
          </View>
    
          <Formik
            initialValues={{ mobileNo: '' }}
            validationSchema={mobileValidationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                {/* Mobile Number Input */}
                <TextInput
                  label={t('mobile_number')}
                  mode="outlined"
                  placeholder={t('placeholder_mobile')}
                  keyboardType="phone-pad"
                  onBlur={handleBlur('mobileNo')}
                  onChangeText={handleChange('mobileNo')}
                  value={values.mobileNo}
                  style={styles.input}
                />
                {errors.mobileNo && touched.mobileNo && (
                  <Text style={styles.errorText}>{errors.mobileNo}</Text>
                )}
                {/* Error Message */}
                {validationErrors?.mobile_no && (
                  <Text style={styles.errorText}>{validationErrors.mobile_no[0]}</Text>
                )}
    
                {error && !validationErrors && (
                  <Text style={styles.errorText}>{error}</Text>  // For general errors (e.g., status 500, or other issues)
                )}

                {/* Loading or Verify Button */}
                {loading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <Button mode="contained" onPress={handleSubmit}>
                    {t('proceed')}
                  </Button>
                )}
    
               
              </View>
            )}
          </Formik>
        </SafeAreaView>
      );
};

export default ForgetPassword;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    image: {
      width: 200,   // Adjust the width as per your design
      height: 200,  // Adjust the height as per your design
      resizeMode: 'contain',  // Ensures the image fits inside the given dimensions
    },
    input: {
      marginBottom: 16,
    },
    errorText: {
      color: 'red',
      marginBottom: 16,
      fontSize: 12,
    },
  });