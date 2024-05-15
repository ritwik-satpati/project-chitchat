import { server } from "../constants/config";

const authV1 = `${server}/api/v1/auth`;

// *** User Registration ***
export const registerUserApi = `${authV1}/register`;

// *** User Login ***
export const loginUserApi = `${authV1}/login`;

// *** User Get ***
export const getUserApi = `${authV1}/`;

// *** User Logout ***
export const logoutUserApi = `${authV1}/logout`;
