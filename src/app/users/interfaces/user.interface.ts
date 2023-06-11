export interface User {
    id: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    subscriptionDate: Date;
    isAdmin: boolean;
    isVerified: boolean;
}