"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalContextType {
    webshopId: number;
    updateWebshopId: (newValue: number) => void;
    loggedIn: boolean;
    updateLoggedIn: (newValue: boolean) => void;
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
    const [loggedIn, updateLoggedIn] = useState<boolean>(false);

    const updateGlobalVarWebshop = (newValue: number) => {
        updateWebshopId(newValue);
    };
    const updateGlobalVarLogin = (newValue: boolean) => {
        updateLoggedIn(newValue);
    };

    return (
        <GlobalContext.Provider value={{ webshopId, updateWebshopId, loggedIn, updateLoggedIn}}>
            {children}
        </GlobalContext.Provider>
    );
};
