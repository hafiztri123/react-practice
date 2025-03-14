import React, { useState } from "react"
import AuthLayout from "./AuthLayout" 
import { useNavigate } from "react-router-dom"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { api } from "../../service/api"
import { ToastContainer, toast } from "react-toastify"

export default function Register() {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const registerSuccess = (message) => toast.success(message, {
        className: "text-xs"
    })
    
    const registerFailed = (message) => toast.error(message, {
        className: "text-xs"
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            });
            registerSuccess(`Welcome, ${response.data.name}! Registration successful.`);
            setPasswordVisible(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            navigate('/login');
        } catch (error) {

            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            registerFailed(errorMessage);
        }
    };



    return (
        <AuthLayout>
            <div className="flex-1">
                <div className="flex flex-col text-4xl">
                    <span>Welcome!</span>
                    <span>Sign up to get started</span>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="name"
                            className="border border-gray-400 w-full rounded-lg p-3 focus:outline-none hover:border-indigo-600"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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
                            <button className="absolute right-4 top-1/3"
                                type="button"
                                onClick={() => setPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? <IoEyeOffOutline className=" w-4 h-4" /> : <IoEyeOutline className=" w-4 h-4" />}
                            </button>
                        </div>
                        <input
                            type="password"
                            className="border border-gray-400 w-full rounded-lg p-3 focus:outline-none hover:border-indigo-600 pr-12"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            className="border w-full text-center p-4 rounded-lg bg-indigo-500 hover:bg-indigo-700 hover:cursor-pointer text-white"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-center text-xs text-gray-400 mt-4 hover:text-gray-600 hover:cursor-pointer">Have an account? <u onClick={() => navigate("/login")}>Sign In</u></p>
                </div>
            </div>
        </AuthLayout>
    )
}
