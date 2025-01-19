import { login } from "../services/ApiService";
import { storeToken } from "../utils/Storage";
import { User, LoginResponse } from "../models/UserModel";

export const handelLogin = async (
    mobileNo: string,
    password: string
): Promise<LoginResponse | null> => {
    try {
        const response = await login(mobileNo, password);
        const { data } = response;

        if (data.status === "success") {
            const userInfo: User = {
                id: data.data.user.id,
                name: data.data.user.name,
                email: data.data.user.email,
                mobile_no: data.data.user.mobile_no,
                token: data.data.token, 
            };

            // Store token securely
            await storeToken(data.data.token);

            // Return LoginResponse
            return {
                status: data.status,
                message: data.message,
                data: {
                    user: userInfo,
                    roles: data.data.roles,
                    permission: data.data.permission,
                    token: data.data.token,
                },
            };
        } else {
            console.log("Error Message:", data.message); // Log message for UI display
            throw new Error(data.message || "Login failed");
        }
    } catch (error: any) {
        if (error.response?.status && error.response?.data?.message) {
            console.log("Status Code:", error.response.status); // Log status code
            console.log("Error Message:", error.response.data.message); // Log error message
            throw new Error(error.response.data.message);
        } else {
            console.error("Unexpected Error:", error); // Log unexpected error
            throw new Error("An unexpected error occurred.");
        }
    }
};
