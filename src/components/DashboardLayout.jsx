import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaCaretDown, FaCaretUp } from "react-icons/fa";
import PeoplePlaceholder from "../assets/people.png"
import { IoIosExit, IoIosNotifications } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";


function DashboardLayout({children}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen relative">
            <div className="flex w-full flex-row p-4 justify-end items-center">
                <div className="relative mr-12 hover:cursor-pointer">
                    <IoIosNotifications className="w-8 h-8" />
                    <div className="absolute bg-purple-600 rounded-full w-4 h-4 -top-1 right-0 text-xs flex text-white items-center justify-center">
                        5
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-2 mr-4 relative">
                    <img src={PeoplePlaceholder} alt="Profile icon" className="w-8 h-8 rounded-md" />
                    <span className="hidden md:block">User</span>
                    <FaCaretDown
                        className={`w-4 h-4 hover:cursor-pointer transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    />

                </div>
            </div>
            <UserDropDown isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex h-full ">
                <div className="flex flex-col w-24">
                    <SidebarBox>
                        <GoHomeFill className="h-6 w-6"/>
                    </SidebarBox>
                    <SidebarBox>
                        <HiMiniUserGroup className="h-6 w-6" />
                    </SidebarBox>
                    <SidebarBox>
                        <FaCalendarAlt className="h-6 w-6" />
                    </SidebarBox>
                    <SidebarBox>
                        <FaGear className="h-6 w-6" />
                    </SidebarBox>


                </div>
                <div className="flex flex-1 bg-purple-50">
                    {children}
                </div>
            </div>
            
        </div>
    )

}

function SidebarBox({children}) {
    return (
        <div className="flex items-center justify-center py-8 hover:bg-purple-600 hover:text-white hover:cursor-pointer   ">
            {children}
        </div>
    )
}

function UserDropDown({ isOpen, setIsOpen }) {
    const dropDownRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [setIsOpen])

    const handleLogout = () => {
        api.post("/logout")
        .then(function (response) {
            localStorage.removeItem('TOKEN')
            navigate('/login')
        }).catch(function(error){
            console.error('Error:', error)
        })
    }

    return (
        <>
            {isOpen ? (
                <div ref={dropDownRef} className="absolute right-0  top-16 w-33.5">
                    <UserDropDownBox> 
                        <button type="button" onClick={handleLogout} className="flex items-center justify-center hover:cursor-pointer ">
                            <span className="mr-3">Log Out</span>
                            <IoIosExit className="h-5 w-5" />
                        </button>
                    </UserDropDownBox>
                    <UserDropDownBox>
                        <span>Setting</span>
                        <FaGear className="h-5 w-5"/>
                    </UserDropDownBox>

                </div>
            ) : ""}
        </>
    );
}

function UserDropDownBox({children}) {
    return (
        <div className="flex items-center justify-between px-4 py-4 cursor-pointer hover:text-white hover:bg-purple-600 bg-white ">
            {children}
        </div>
    )
}

export default DashboardLayout