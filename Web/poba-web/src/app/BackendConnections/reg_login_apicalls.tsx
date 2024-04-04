import User from "@/DTOs/Users/User";
import axios from "axios";
import RegisterUser from "@/DTOs/Users/RegisterUser";

export const login = async (loginUser : User) => {
    try {
        const response = await axios.post("http://localhost:3000/auth/login", loginUser, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        localStorage.setItem("userName", response.data.username);
        localStorage.setItem("webshopId", JSON.stringify(response.data.webshopid));
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
};

export const reg = async (regUser : RegisterUser) => {
    try {
        const response = await axios.post("http://localhost:3000/auth/reg", regUser, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
}

export const logOut = async () => {
    await axios.post("http://localhost:3000/auth/logout", {}, {
        withCredentials: true,
        headers: {}
    });

    return  "HomePage";
};
