// react
import { useState } from "react";
//api
import { changePassword } from "../services/ApiService";
//model
import { CommonModel } from "../models/CommonModel";


export const usePasswordChangeController = () => {

    //loading
    const [loading, setLoading] = useState(false);
    //errors
    const [error, setError] = useState<string | null>(null);
    //success
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const verifyPassword = async (mobile_no: string, password: string, password_confirmation:string) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        
        try {
            const response: CommonModel | null = await changePassword(mobile_no, password, password_confirmation);
            if(response && response.status === "success"){
                setSuccessMessage(response.message);
            }else{
                setError(response?.message || "Unknown error occurred");
            }
        } catch (err : any) {
            setError(err.message || 'Network error');
        } finally {
          setLoading(false);
        }
    };

    return {verifyPassword, loading, error, successMessage}

}