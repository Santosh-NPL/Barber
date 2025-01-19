  
  export interface OtpResponseModel {
    status: string; // Expected to be "success" in this case
    message: string; // Message describing the result
    data: {
        mobile_no: string;
    } // Contains the mobile number information
  }