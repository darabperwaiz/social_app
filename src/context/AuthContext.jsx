import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
      });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [])

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null)
        navigate('/login')
    }

    const updateUser = (userData) => {
        const storedUser = localStorage.getItem('user');
        const data = JSON.parse(storedUser);
        if(data.id === userData?.id) {
            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData);
        } else {
            console.log("You are not allowed!")
        }
    }

    return (
    <AuthContext.Provider value={{user, login, logout, updateUser, loading}} >
        {children}
    </AuthContext.Provider>
    )
};