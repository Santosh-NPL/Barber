import axios from 'axios';
import { OtpResponseModel } from '../models/OtpResponseModel';
import { CommonModel } from '../models/CommonModel';

const BASE_URL = 'http://192.168.1.33:8080/api';

export const ApiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


ApiService.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
  
        console.log('Status Code:', status); // Log status code
        console.log('Error Response:', data); // Log complete error response
  
        if (status === 422) {
          // Extract validation errors correctly
          const validationErrors = data.errors || {}; // Handle validation errors from the API
          const errorMessage = data.message || "Validation error occurred."; // General error message if provided
  
          // Return detailed validation errors and message
          throw {
            status,
            validationErrors,
            message: errorMessage,
          };
        }
  
        if (status === 500) {
          throw {
            status,
            message: data.message || 'Status 500,  Please try again.',
          };
        }
  
        // Handle other errors
        throw {
          status,
          message: data.message || 'An unexpected error occurred.',
        };
      }
  
      console.log('Request Error:', error.request); // Log network request error
      throw new Error('Network error. Please check your connection.');
    }
  );

  // Exported functions for API calls
export const login = (mobile_no: string, password: string) => {
    return ApiService.post('/login', { mobile_no, password });
  };

  export const toVerifyMobileNo = async (mobile_no: string): Promise<OtpResponseModel | null> => {
    const response = await ApiService.post('/verify-mobile', {mobile_no});
    console.log(response);
    return response.data as OtpResponseModel;
  }
  //otp-verify

  export const otpVerifing = async (otp:string, mobile_no: string): Promise<OtpResponseModel | null> => {
    const response = await ApiService.post('/otp-verify', {otp, mobile_no});
    console.log(response);
    return response.data as OtpResponseModel;
  }

  //update-password

  export const changePassword = async (mobile_no:string, password:string, password_confirmation:string):
  Promise<CommonModel | null> => {
    const response = await ApiService.post('/update-password', {mobile_no, password, password_confirmation});
    console.log(response);
    return response.data as CommonModel;
  }