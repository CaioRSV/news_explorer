import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface userDataContextType {
    userData: string;
    setUserData: Dispatch<SetStateAction<any>>;
}

const userDataContext = createContext<userDataContextType | null>(null);

export const useUserDataContext = () => {
    const context = useContext(userDataContext);
    if (!context) {
        throw new Error("useUserDataContext must be used within a UserDataContextProvider");
    }
    return context;
};

interface UserDataContextProviderProps {
    children: ReactNode;
}

export const UserDataContextProvider: React.FC<UserDataContextProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<any>(null);

    return (
        <userDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </userDataContext.Provider>
    );
};
