import React, { useState } from "react";
import LogoPlaceholder from "../../assets/logoipsum-261.svg"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";



function AuthLayout( {children} ) {
    return (
        <div className={`bg-[url(/home/hafizh/projects/fuck/react-practice/src/assets/violet-watercolor-texture-background.jpg)] w-screen h-screen bg-cover bg-center p-8 flex`}>
            <div className="w-128 h-auto overflow-auto rounded-2xl bg-white flex flex-col p-8">
                <div className="flex justify-center items-center mb-48">

                    <img src={LogoPlaceholder} alt="Logo" />
                </div>
                    {children}
                <div className="">
                    <p className="text-center text-xs text-gray-400">
                        By continuing you accept the <u className="cursor-pointer hover:text-gray-600">Regulations</u> and the<br/>
                        <u className="cursor-pointer hover:text-gray-600">Privacy Policy</u>
                    </p>
                </div>
            </div>
        </div>
    )
}

export function Login() {
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Email:', email)
        console.log('Password', password)

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

export function Register(){
    const [isPasswordVisible, setPasswordVisible] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Name: ', name)
        console.log('Email: ', email)
        console.log('Password: ', password)
        console.log('Confirm Password: ', confirmPassword)

        if(password != confirmPassword) {
            console.log('Password is not valid')
        }

    }


    return(
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
                                {isPasswordVisible ? <IoEyeOffOutline className=" w-4 h-4" /> : <IoEyeOutline className=" w-4 h-4" /> }
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

