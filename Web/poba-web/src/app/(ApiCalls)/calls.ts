import axios from "axios";
import User from "@/app/(DTOs)/Users/User";
import RegisterUser from "@/app/(DTOs)/Users/RegisterUser";

export const logOut = async () => {

    await axios.post("http://localhost:3000/logout", {}, {
        withCredentials: true
    }).catch(e => alert("A kijelentkezés hibába futott. " + e.code));
}

export const login = async (loginUser : User) => {
    const response = await axios.post("http://localhost:3000/login", {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        params : {
            username : loginUser.username,
            password : loginUser.password
        }
    }).catch(e => {throw new Error(e)});

    return response.data;
}

export const reg = async (regUser : RegisterUser) => {
    await axios.post("http://localhost:3000/reg", {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        params: {
            username : regUser.username,
            password: regUser.password,
            api_key: regUser.api_key
        }
    });
}

export const ChangePassword = async (oldPassword : string, newPassword : string) => {
    await axios.post("http://localhost:3000/changePassword", {}, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
        params : {
            opw : oldPassword,
            npw : newPassword
        }
    })
}