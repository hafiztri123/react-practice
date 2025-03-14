import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../service/api"
import AuthLayout from "./AuthLayout"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { toast } from "react-toastify"



export default function Login() {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

        const loginSuccess = (message) => toast.success(message, {
            className: "text-xs"
        })
        
        const loginFailed = (message) => toast.error(message, {
            className: "text-xs"
        })
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await api.post('/login', {
            email: email,
            password: password,
            device_name: navigator.userAgent
        })
            .then(function (response) {
                localStorage.setItem('TOKEN', response.data.data)
                navigate('/dashboard')

                setPasswordVisible(false)
                setEmail("")
                setPassword("")
            })
            .catch(function (error) {
                loginFailed(error.response?.data?.message)
            })

    }

    return (

        <AuthLayout>
            <div className="flex-1">
                <div className="flex flex-col text-4xl">
                    <span>Welcome!</span>
                    <span>Login to your account</span>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="email"
                            className="border border-gray-400 w-full rounded-lg p-3 focus:outline-none hover:border-indigo-600"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                className="border border-gray-400 w-full rounded-lg p-3 focus:outline-none hover:border-indigo-600 pr-12"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={() => setPasswordVisible(!isPasswordVisible)} className="absolute right-4 top-1/3" type="button">
                                {isPasswordVisible ? <IoEyeOffOutline className="w-4 h-4" /> : <IoEyeOutline className="w-4 h-4" />}
                            </button>
                        </div>
                        <button
                            className="border w-full text-center p-4 rounded-lg bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer text-white"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-400 mt-4 hover:text-gray-600 hover:cursor-pointer" onClick={() => navigate("/register")}>Didn't have an account? <u>Sign Up</u></p>
                </div>
            </div>
        </AuthLayout>
    )
}

