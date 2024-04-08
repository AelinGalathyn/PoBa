"use client";
import {fetch_username} from "@/app/(ApiCalls)/fetch";
import React, {useEffect, useState} from "react";

export default function UserName() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const getUsername = async () => {
            try {
                const userData = await fetch_username();
                if(typeof userData === "string") {
                    setUsername(userData);
                }
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        getUsername();
    }, []);

    return (
        <p className="text-white font-bold ps-1 drop-shadow-lg">{username}</p>
    )
}