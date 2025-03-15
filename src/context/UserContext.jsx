import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";


const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            await api.get('/me')
            .then(function(response) {
                const user = response.data.data
                setUser(user)
                
            })
            .catch(function(error) {
                console.error(error.response?.data?.message)
                setUser(null)
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
        <UserContext.Provider value={{ user, setUser, logout}}>
            {children}
        </UserContext.Provider>
    )
}