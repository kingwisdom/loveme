import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Loader, X } from 'lucide-react'
import { useMatchStore } from '../store/useMatchStore'
const Sideber = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSlider = () => {
        setIsOpen(!isOpen)
    }
    const { getMyMatches, matches, isMatchLoading } = useMatchStore();
    // console.log(matches)
    useEffect(() => {
        getMyMatches();
    }, [getMyMatches])

    return (
        <>
            <div className={`
		fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300
		 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-1/4`}
            >
                <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='p-4 pb-[27px] border-b border-pink-200 flex justify-between items-center'>
                        <h2 className='text-xl font-bold text-pink-600'>Matches</h2>
                        <button
                            className='lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none'
                            onClick={toggleSlider}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className='flex-grow overflow-y-auto p-4 z-10 relative'>
                        {isMatchLoading ? (
                            <LoadingState />
                        ) : !matches ? (
                            <NoMatchesFound />
                        ) : (
                            matches.map((match) => (
                                <Link key={match._id} to={`/chat/${match._id}`}>
                                    <div className='flex items-center mb-4 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors duration-300'>
                                        <img
                                            src={match.image || "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"}
                                            alt='User avatar'
                                            className='size-12 object-cover rounded-full mr-3 border-2 border-pink-300'
                                        />

                                        <h3 className='font-semibold text-gray-800'>{match.name}</h3>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default Sideber


const NoMatchesFound = () => (
    <div className='flex flex-col items-center justify-center text-center'>
        <Heart className='text-pink-400 mb-4' size={48} />
        <h3 className='text-xl font-semibold text-gray-700 mb-2'>No Matches Yet</h3>
        <p className='text-gray-500 max-w-xs'> Don&apos;t worry! Your perfect match is just around the corner. Keep swiping! </p>
    </div>
);

const LoadingState = () => (
    <div className='flex flex-col items-center justify-center h-full text-center'>
        <Loader className='text-pink-500 mb-4 animate-spin' size={48} />
        <h3 className='text-xl font-semibold text-gray-700 mb-2'>Loading Matches</h3>
        <p className='text-gray-500 max-w-xs'>
            We&apos;re finding your perfect matches. This might take a moment...</p>
    </div>
);