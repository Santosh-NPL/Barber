import { useState } from "react";
import { toVerifyMobileNo } from "../services/ApiService";
// import { OtpResponseModel } from "../models/OtpResponseModel";

export const mobileVerificationController = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [error, setError] = useState<any | null> (null);
    const [validationErrors, setValidationErrors] = useState<any | null>(null); // Store validation errors
    const [mobileNumber, setMobileNumber] = useState<string | null> (null);
 
    const verifyMobile = async(mobileNo: string) => {
        setLoading(true);
        setError(null);
        setValidationErrors(null);

        try{
            console.log(mobileNo);
            const response = await toVerifyMobileNo(mobileNo);
            setResponseMessage(response.message);
            setMobileNumber(mobileNo);
        } catch (err: any) {
            // Handle validation errors (from status code 422)
            if (err.status === 422) {
              setValidationErrors(err.validationErrors); // Extract validation errors
              setError(err.message); // Display the general message (optional)
            } else {
              // Handle general errors (status code other than 422 or 500)
              setError(err.message || "An unexpected error occurred.");
            }
          } finally {
            setLoading(false);
          }

    };
    return {
        loading,
        responseMessage,
        error,
        validationErrors,
        verifyMobile,
        mobileNumber,
      };
}