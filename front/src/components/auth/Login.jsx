import React, { useState } from 'react'
import useAuthStore from '../../store/useAuthStore'

const Login = () => {
    const { login, loading } = useAuthStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        login({ email, password })
    }
    return (
        <form className='space-y-6' onSubmit={handleLogin}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address </label>
                <div className="mt-1">
                    <input id="email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                </div>
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password </label>
                <div className="mt-1">
                    <input id="password" name="password" onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="password" required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                </div>
            </div>

            <button className={`w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'}`} disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
        </form>
    )
}

export default Login