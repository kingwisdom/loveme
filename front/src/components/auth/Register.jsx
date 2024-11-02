import React, { useState } from 'react'
import useAuthStore from '../../store/useAuthStore'

const Register = () => {
    const [age, setAge] = useState(18)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [genderPreference, setGenderPreference] = useState('')

    const { register, loading } = useAuthStore()
    const handleSignUp = (e) => {
        e.preventDefault()
        register({ name, email, password, age, gender, genderPreference })
    }
    return (
        <form className='space-y-6' onSubmit={handleSignUp}>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name </label>
                <div className="mt-1">
                    <input id="name" name="name" type="name" autoComplete="name" onChange={(e) => setName(e.target.value)} required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                </div>
            </div>
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
                    <input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="password" required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                </div>
            </div>
            <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age </label>
                <div className="mt-1">
                    <input id="age" name="age" type="number" autoComplete="password" required
                        value={age} onChange={(e) => setAge(e.target.value)} min={18} className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                </div>
            </div>
            <p className="block text-sm font-medium text-gray-700">Gender</p>
            <div className="flex items-center">
                <input type="checkbox" id="gender" name="gender" className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    value={gender} />

                <label htmlFor="male" className="ml-2 block text-sm font-medium text-gray-900">
                    Male </label>
            </div>
            <div className="flex items-center">
                <input type="checkbox" id="gender" name="gender" className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    checked={gender === "female"}
                    onChange={() => setGender("female")} />

                <label htmlFor="female" className="ml-2 block text-sm font-medium text-gray-900">
                    Female </label>
            </div>

            <div>
                <label htmlFor="preferedGender" className="block text-sm font-medium text-gray-700">
                    Interested In </label>
                <div className="mt-1">
                    <select id="preferedGender" name="genderPreference" autoComplete="preferedGender"
                        value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)}
                        required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="both">Both</option>
                    </select>
                </div>
            </div>
            <button className={`w-full flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'}`} disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
        </form>
    )
}

export default Register