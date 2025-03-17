import React, { useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaCaretDown, FaCaretUp, FaChevronCircleRight, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import PeoplePlaceholder from "../assets/people.png"
import { IoIosExit, IoIosNotifications } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { api } from "../service/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ClickAwayListener from "react-click-away-listener";
import { toast } from 'react-toastify'
import { IoChevronBack } from "react-icons/io5";



function DashboardLayout({children}) {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout, isLoading: isProfileLoading  } = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [isNotificationOpen, setNotificationOpen] = useState(false)
    const [NotificationData, setNotificationData] = useState("")
    const [notificationDataMeta, setNotificationDataMeta] = useState("")
    const [isMarkAsRead, setMarkAsRead] = useState(false)
    const [NotitificationNumber, setNotificationNumber] = useState(0)
    const [NotificationCurrentPage, setNotificationCurrentPage] = useState(1) 

    const errorResponse = (message) => toast.error(message, {
        className: 'text-xs',
        autoClose: 1000
    })

    const successResponse = (message) => toast.success(message, {
        className: 'text-xs',
        autoClose: 1000
    })

    useEffect(() => {
        api.get(`/notifications?page=${NotificationCurrentPage}`)
            .then(function(response){
                const notifications = response.data.data.map((notification) => {
                    return notification
                })

                setNotificationData(notifications)
                setNotificationNumber(notifications.length)
                setNotificationDataMeta(response.data.meta)
            })
            .catch(function(error){
                console.log(error.response?.data?.message)
            })
    }, [isMarkAsRead, NotificationCurrentPage])

    const MarkAsRead = (id) => {
        api.post(`/notifications/${id}/read`)
            .then(function(response){
                setMarkAsRead(!isMarkAsRead)
                setNotificationNumber(NotitificationNumber - 1)
            })
            .catch(function(error){
                console.log(error?.response?.data?.message)
            })
    }

    const deleteNotififcation = (id) => {
        api.delete(`/notifications/${id}`)
            .then(function(response){
                setNotificationNumber(NotitificationNumber - 1)
                setNotificationData(NotificationData.filter((notification) => notification.id !== id))
            })
            .catch(function(error){
                errorResponse('Failed to delete notification. Try again later')
            })
    }

    const nextNotificationPage = () => {
        if(NotificationCurrentPage + 1 <= notificationDataMeta.last_page){
            setNotificationCurrentPage(NotificationCurrentPage + 1)
        }

        return NotificationCurrentPage
    }

    const previousNotificationPage = () => {
        if (NotificationCurrentPage - 1 >= 1) {
            setNotificationCurrentPage(NotificationCurrentPage - 1)
        }
    }




    return (
        <div className="flex flex-col h-screen relative">
            <div className="flex w-full flex-row p-4 justify-end items-center">
                    <div className="relative mr-12 " onClick={() => setNotificationOpen(!isNotificationOpen)}>
                    <IoIosNotifications className="w-8 h-8 hover:cursor-pointer" />
                        {user?.unread_notification > 0 && (
                            <div className="absolute bg-indigo-400 rounded-full w-4 h-4 -top-1 right-0 text-xs flex text-white items-center justify-center">
                                {user?.unread_notification}
                            </div>
                        )}
                        {isNotificationOpen && <Notification 
                            notificationData={NotificationData} 
                            handleMarkAsRead={MarkAsRead} 
                            setMarkAsRead={setMarkAsRead} 
                            markAsRead={isMarkAsRead} 
                            deleteNotification={deleteNotififcation} 
                            notificationDataMeta={notificationDataMeta}
                            nextNotificationPage={nextNotificationPage}
                            prevNotificationPage={previousNotificationPage}
                            />}

                    </div>
                <div className="flex items-center justify-center gap-x-2 mr-4 relative">
                    <img src={PeoplePlaceholder} alt="Profile icon" className="w-8 h-8 rounded-md" />
                    <span className="hidden md:block">{isProfileLoading ? "Loading..." : user?.name }</span>
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
                    <button type="button" onClick={() => navigate('/')}>
                        <SidebarBox>
                            <GoHomeFill className="h-6 w-6" />
                        </SidebarBox>
                    </button>
                    <button type="button" onClick={() => navigate('/add-candidate')}>
                        <SidebarBox>
                            <FaPlus className="h-6 w-6" />
                        </SidebarBox>
                    </button>
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

function Notification({ notificationData, handleMarkAsRead, setMarkAsRead, markAsRead, deleteNotification, notificationDataMeta, nextNotificationPage, prevNotificationPage }){

    return (
        <div className="flex flex-col absolute right-0 overflow-auto justify-center border-2 border-black bg-indigo-100 z-50 rounded-md min-w-64 max-w-128" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col justify-center items-center border-b-2">
                <span>Notification</span>
            </div>
            {notificationData && notificationData.length > 0 && (
                notificationData.map((notification, index) => (
                    <div className={`flex flex-col whitespace-nowrap pb-4 pt-2 pl-4 pr-4 max-h-64 overflow-auto ${index > 0 && "border-t border-black/30"} 400 hover:text-white ${notification?.read_at ? "bg-gray-400 text-white" : "hover:bg-indigo-400"}`}>
                        {notification?.data?.message}
                        <div className="flex flex-row mt-5">
                            <span className="text-xs hover:text-gray-600 hover:underline mr-4 hover:cursor-pointer active:text-gray-900" onClick={(e) => {e.stopPropagation(); handleMarkAsRead(notification?.id); setMarkAsRead(!markAsRead) }}>Mark as Read</span>
                            <span className="text-xs hover:text-gray-600 hover:underline hover:cursor-pointer active:text-gray-900" onClick={(e) => {e.stopPropagation(); deleteNotification(notification.id)}}>Delete</span>
                        </div>
                    </div>
                ))
            )}
            <div className="border-t-2 flex p-4 justify-center items-center space-x-2">
                <div>
                    <FaChevronLeft className="w-5 h-5 text-gray-500 hover:text-gray-800 active:scale-90 transition-transform" onClick={(e) => {e.stopPropagation(); prevNotificationPage()}}/>
                </div>
                <div className="border-2 px-2 bg-gray-200 rounded-md border-gray-400">
                    <span>{notificationDataMeta.current_page}</span>
                </div>
                <div>
                    <FaChevronRight className="w-5 h-5 text-gray-500 hover:text-gray-800 active:scale-90 transition-transform"  onClick={(e) => {e.stopPropagation(); nextNotificationPage()}}/>

                </div>
            </div>
        </div>
    )
}



export default DashboardLayout