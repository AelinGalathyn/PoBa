import axios from "axios";
import User from "@/app/(DTOs)/Users/User";
import RegisterUser from "@/app/(DTOs)/Users/RegisterUser";

export const logOut = async () => {

    await axios.post("http://localhost:3000/logout", {}, {
        withCredentials: true
    });
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
    }).catch(e => {console.log(e);throw new Error(e)});

    return response.data;
}

export const reg = async (regUser : RegisterUser) => {
    await axios.post("http://localhost:3000/reg", regUser, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        },
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