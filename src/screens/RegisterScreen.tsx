import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const RegisterScreen = () => {
  const contactNumber = '+9779845563649'; // Replace with your contact number

  return (
    <View className="flex-1 bg-gray-100 justify-center items-center">
      <Text className="text-lg font-bold text-gray-800">
        Registration Required
      </Text>
      <Text className="mt-4 text-center text-gray-700">
        To register, please contact us at:
      </Text>
      <Text className="mt-2 text-blue-600 text-lg">
        {contactNumber}
      </Text>
      <TouchableOpacity
        className="mt-6 bg-blue-500 px-6 py-3 rounded-lg shadow-md"
        onPress={() => {
          Alert.alert('Contact Us', `Please call us at: ${contactNumber}`);
        }}
      >
        <Text className="text-white font-semibold">Call Us Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
