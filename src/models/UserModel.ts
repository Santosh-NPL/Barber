export interface User {
    id: number;
    name: string;
    email: string | null;
    mobile_no: string;
    token: string;
}

export interface LoginResponse {
    status: string;
    message: string;
    data: {
        user: User;
        roles: string[];
        permission: string[];
        token: string;
    };
}
