import axios from "axios";
import User from "@/app/(DTOs)/Users/User";
import RegisterUser from "@/app/(DTOs)/Users/RegisterUser";
import {cache} from "react";

export const logOut = cache(async () => {
    await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true,
        headers: {}
    });
})

export const login = async (loginUser : User) => {
    const response = await axios.post("http://localhost:3000/auth/login", loginUser, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    });

    console.log(response);
}

export const reg = cache(async (regUser : RegisterUser) => {
    await axios.post("http://localhost:3000/auth/reg", regUser, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
    });
})