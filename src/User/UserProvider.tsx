import {type ReactNode, useState} from "react";

import {UserContext} from "./UserContext";
import type {User} from "../types.ts";

const USER_STORAGE_KEY = 'user';

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<User | null>(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const setUser = (userData: User | null) => {
        setUserState(userData);
        if (userData) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
}
