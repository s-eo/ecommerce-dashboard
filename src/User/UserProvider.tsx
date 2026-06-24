import {type ReactNode, useEffect, useState} from "react";

import {UserContext} from "./UserContext";
import type {User} from "../types.ts";

const mockMe = async (token: string | null): Promise<{ user: User }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // if token is valid
    if (token) {
        return {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'Admin',
            },
        };
    }

    throw new Error('Invalid token or not sent');
};

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        mockMe(localStorage.getItem('token'))
            .then(data => {
                setUser(data.user);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

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
