import React, { useState } from "react";
import LogoPlaceholder from "../../assets/logoipsum-261.svg"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { api } from "../../service/api";



export default function AuthLayout( {children} ) {
    return (
        <div className={`bg-[url(/home/hafizh/projects/fuck/react-practice/src/assets/violet-watercolor-texture-background.jpg)] w-screen h-screen bg-cover bg-center p-8 flex`}>
            <div className="w-128 h-auto overflow-auto rounded-2xl bg-white flex flex-col p-8">
                <div className="flex justify-center items-center mb-48">

                    <img src={LogoPlaceholder} alt="Logo" />
                </div>
                    {children}
                <div className="mb-4">
                    <p className="text-center text-xs text-gray-400">
                        By continuing you accept the {' '} <u className="cursor-pointer hover:text-gray-600">Regulations</u> and the<br/>
                        <u className="cursor-pointer hover:text-gray-600">Privacy Policy</u>
                    </p>
                </div>
            </div>
        </div>
    )
}

