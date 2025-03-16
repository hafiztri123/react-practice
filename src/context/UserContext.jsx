import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";


const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchUser = () => {
            api.get('/me')
            .then(function(response) {
                const user = response.data.data
                setUser(user)
                setLoading(false)
                
            })
            .catch(function(error) {
                setLoading(false)
                if (!user) setUser(null)
                console.error(error.response?.data?.message)
            })
        }

        fetchUser()
    }, [])

    const logout = async () => {
        await api.post('/logout')
        .then(function(response) {
            setUser(null)
        })
        .catch(function(error){
            console.error(error.response?.data?.message)
        })
    }

    return (
        <UserContext.Provider value={{ user, setUser, logout, isLoading, setLoading }}>
            {children}
        </UserContext.Provider>
    )
}