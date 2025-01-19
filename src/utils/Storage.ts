import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

// Store Token
export const storeToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error("Error storing token:", error);
    }
};

// Get Token
export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return token;
    } catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
};

// Remove Token
export const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error("Error removing token:", error);
    }
};
