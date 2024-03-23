"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Item from "@/app/Termekek/Termek";

interface GlobalContextType {
    webshopId: number;
    updateWebshopId: (newValue: number) => void;
    userName: string;
    updateUserName: (newValue: string) => void;
    termekek: Item[];
    updateTermekek: (newValue: Item[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [webshopId, updateWebshopId] = useState<number>(0);
    const [userName, updateUserName] = useState<string>("");
    const [termekek, updateTermekek] = useState<Item[]>([]);

    const updateGlobalVar = (newValue: number) => {
        updateWebshopId(newValue);
    };

    const updateGlobalVarUName = (newValue: string) => {
        updateUserName(newValue);
    };
    const updateGlobalVarTermekek = (newValue: Item[]) => {
        updateTermekek(newValue);
    };

    return (
        <GlobalContext.Provider value={{ webshopId, updateWebshopId, userName, updateUserName, termekek, updateTermekek}}>
            {children}
        </GlobalContext.Provider>
    );
};
