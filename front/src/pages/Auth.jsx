import React, { useState } from 'react'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-red-500 to-pink-500 p-4'>
            <div className="w-full max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-white mb-8">{isLogin ? 'Login' : 'Create Account'}</h2>

                <div className="bg-white shadow-xl rounded-lg p-8">
                    {isLogin ? <Login /> : <Register />}

                    <div className="mt-8 text-center">
                        <p className="text-sm">{isLogin ? "New to Loveme" : "Already have an account"}</p>

                        <button className="mt-2 text-red-600 hover:text-red-800 font-medium transition-colors duration-300" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Create Account' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Auth