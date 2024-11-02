import React, { useRef, useState } from 'react'
import useAuthStore from '../store/useAuthStore'
import { useUserStore } from '../store/useUserStore'

const Profile = () => {
    const { user } = useAuthStore()
    // console.log(user)
    const [age, setAge] = useState(user.age || "")
    const [name, setName] = useState(user.name || "")
    const [email, setEmail] = useState(user.email || "")
    const [gender, setGender] = useState(user.gender || "")
    const [genderPreference, setGenderPreference] = useState(user.genderPreference || "")
    const [bio, setBio] = useState(user.bio || "")
    const [image, setImage] = useState(user.image || "")

    const fileInputRef = useRef(null)

    const { updateProfile, loading } = useUserStore()


    const handleSubmit = (event) => {
        event.preventDefault()
        updateProfile({
            name, email, age, gender, genderPreference, bio, image
        });
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className='min-h-screenbg-gray-50 flex flex-col'>
            <div className='flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 1g:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3x1 font-extrabold text-gray-900'>Your Profile</h2>
                </div>
                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white py-8 px-4 shadow sm:rounded-1g sm:px-10 border border-gray-200'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name </label>
                                <div className="mt-1">
                                    <input id="name" name="name" value={name} type="name" autoComplete="name" onChange={(e) => setName(e.target.value)} required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
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

                            <div className="mt-4 space-y-2">
                                <p className="block text-sm font-medium text-gray-700">Gender</p>
                                <div className="flex gap-3">
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
                                </div>
                            </div>

                            <div className="mt-4">
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

                            <div className="mt-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Bio </label>
                                <div className="mt-1">
                                    <textarea rows={4} id="bio" name="bio" value={bio} type="name" onChange={(e) => setBio(e.target.value)} required className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"></textarea>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className='block text-sm font-medium text-gray-700'>Cover Image</label>
                                <div className='mt-1 flex items-center'>
                                    <button type='button' onClick={() => fileInputRef.current.click()}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-si font-medium text-gray-700 bg-white hover:bg-gray-50 focus: outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"> Upload Image </button>
                                    <input
                                        ref={fileInputRef}
                                        type='file' accept='image/*'
                                        className='hidden' onChange={handleImageChange} />

                                </div>
                            </div>
                            {image && (
                                <div className='my-4'>
                                    <img src={image} alt="profile" className='w-48 h-48 rounded-xl' />
                                </div>
                            )}

                            <button className={`w-full mt-4 flex justify-center py-2 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'}`} disabled={loading}>{loading ? 'Loading...' : 'Save'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile