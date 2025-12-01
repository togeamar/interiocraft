import { USER_BASE_URL } from "../../constants/ApiConstants";
import client from "./client";

export function doLogin(logindata){
    return client.post(`${USER_BASE_URL}/signin`,logindata);
}

export function doSignup(signupdata){
    return client.post(`${USER_BASE_URL}/signup`,signupdata);
}