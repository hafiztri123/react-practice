import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaCaretDown, FaCaretUp } from "react-icons/fa";
import PeoplePlaceholder from "../assets/people.png"
import { IoIosExit, IoIosNotifications } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ClickAwayListener from "react-click-away-listener";


function DashboardLayout({children}) {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { logout } = useUser()    




    return (
        <div className="flex flex-col h-screen relative">
            <div className="flex w-full flex-row p-4 justify-end items-center">
                <div className="relative mr-12 hover:cursor-pointer">
                    <IoIosNotifications className="w-8 h-8" />
                    {user?.unread_notification > 0 && (
                        <div className="absolute bg-indigo-400 rounded-full w-4 h-4 -top-1 right-0 text-xs flex text-white items-center justify-center">
                            {user?.unread_notification}
                        </div>
                    )}
                </div>
                <div className="flex items-center justify-center gap-x-2 mr-4 relative">
                    <img src={PeoplePlaceholder} alt="Profile icon" className="w-8 h-8 rounded-md" />
                    <span className="hidden md:block">{user?.name}</span>
                    <button
                        type="button"
                        onClick={(e) => {
                            setIsOpen(!isOpen);
                        }}
                    >

                        <FaCaretUp
                            className={`w-4 h-4 hover:cursor-pointer transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                </div>
            </div>
            <UserDropDown 
                isOpen={isOpen}
                setIsOpen={setIsOpen} 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                navigate={navigate} 
                logout={logout} 
            />
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
                <div className="flex flex-1 bg-purple-50 h-full">
                    {children}
                </div>
            </div>
            
        </div>
    )

}

function SidebarBox({children}) {
    return (
        <div className="flex items-center justify-center py-8 hover:bg-indigo-400 hover:text-white hover:cursor-pointer   ">
            {children}
        </div>
    )
}

function UserDropDown({ isOpen, setIsOpen, isLoading, setIsLoading, navigate, logout }) {



    const handleLogout = () => {
        setIsLoading(true)
        api.post("/logout")
        .then(function (response) {
            logout()
            localStorage.removeItem('TOKEN')
            setIsLoading(false)
            navigate('/login')
        }).catch(function(error){
            console.error('Error:', error)
            setIsLoading(false)
        })
    }

    return (
        <>
            {isOpen ? (
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                    <div className="absolute right-0  top-16 w-33.5 z-50">
                        <UserDropDownBox>
                            <button type="button" onClick={handleLogout} className="flex items-center justify-center hover:cursor-pointer" disabled={isLoading}>
                                <span className="mr-3">Log Out</span>
                                {isLoading ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-t-indigo-400"></div>
                                ) : (
                                    <IoIosExit className="h-5 w-5" />
                                )}
                            </button>
                        </UserDropDownBox>
                        <UserDropDownBox>
                            <span>Setting</span>
                            <FaGear className="h-5 w-5" />
                        </UserDropDownBox>
                    </div>
                </ClickAwayListener>
            ) : ""}
        </>
    );
}

function UserDropDownBox({children}) {
    return (
        <div className="flex items-center justify-between px-4 py-4 cursor-pointer hover:text-white hover:bg-indigo-400 bg-white ">
            {children}
        </div>
    )
}

export default DashboardLayout