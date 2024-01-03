import { createContext, useState } from "react";

export const UserContext = createContext({})

export default function UserProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState({
        email: "",
        token: ""
    })

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}