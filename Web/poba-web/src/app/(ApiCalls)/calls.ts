import axios from "axios";
import User from "@/app/(DTOs)/Users/User";
import RegisterUser from "@/app/(DTOs)/Users/RegisterUser";

export const logOut = async () => {
    await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true
    });
}

export const login = async (loginUser : User) => {
    const response = await axios.post("http://localhost:3000/auth/login", loginUser, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response.data;
}

export const reg = async (regUser : RegisterUser) => {
    await axios.post("http://localhost:3000/auth/reg", regUser, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    });
}