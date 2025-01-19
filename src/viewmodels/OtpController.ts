import { useState } from 'react';
import { otpVerifing } from '../services/ApiService';
import { OtpResponseModel } from '../models/OtpResponseModel';

export const useOtpController = () => {

  // loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null> (null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const verifyOtp = async (otp: string, mobile_no: string) => {
    setLoading(true)
    setError(null);
    setSuccessMessage(null);

    try {
      const response: OtpResponseModel | null = await otpVerifing(otp, mobile_no);
      if (response && response.status === 'success') {
        setSuccessMessage(response.message);
      } else {
        setError(response?.message || 'Unknown error occurred');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return { verifyOtp, loading, error, successMessage}


}