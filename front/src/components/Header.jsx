import React, { useEffect, useRef, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import { Flame, HeartHandshake, LogOut, Menu, User } from 'lucide-react'

const Header = () => {
    const { user, logout } = useAuthStore()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        handleNavClick()
    }, [])

    const handleNavClick = () => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }
    return (
        <header className='bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-1g'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center py-4'>
                    <div className='flex items-center'>
                        <Link to="/" className='flex items-center space-x-2'>
                            <HeartHandshake className="w-8 h-8text-white" />

                            <span className='text-2xl font-bold text-white hidden sm:inline'>Loveme</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className='relative' ref={dropdownRef}>
                                <button className="flex items-center space-x-2 focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <img src={user.image || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} alt="User" className="w-10 h-10 object-cover rounded-full border-2 border-white" />
                                    <span className='text-white'>{user.name}</span>
                                </button>

                                {dropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 2-10'>
                                        <Link to='/profile' className='px-4 py-2 text-smtext-gray-700 hover:bg-gray-100 flex items-center' onClick={() => setDropdownOpen(false)}
                                        >
                                            <User className='mr-2' size={16} />
                                            Profile
                                        </Link>
                                        <button onClick={logout} className='w-full text-left px-4 py-2 text-sm text-gray-700hover:bg-gray-100 flex items-center'>
                                            <LogOut className='mr-2' size={16} /> Logout </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to='/auth' className='text-white hover:text-pink-200 transition duration-150 ease-in-out'>Login</Link>
                                <Link to='/auth' className='bg-white text-pink-600 px-4 py-2 rounded-full hover:bg-pink-100 transition duration-150 ease-in-out'>sign Up</Link>
                            </>
                        )}

                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden">
                        <button
                            className=" rounded-md text-white focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className='size-6' />
                        </button>
                    </div>
                </div>
            </div>


        </header >
    )
}

export default Header