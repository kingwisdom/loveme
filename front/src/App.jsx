import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Chat from './pages/Chat'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import { Sidebar } from 'lucide-react'

function App() {
  const { checkAuth, checkingAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (checkingAuth) {
    return <div>Loading...</div>
  }
  return (
    <div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right, #f0f0f0_1px, transparent_1px), linear-gradient(to_bottom, #f0f0f0_1px, transparent_1px)] bg-[size:6rem_4rem]'>
      <Header />
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!user ? <Auth /> : <Navigate to='/' />} />
        <Route path='/profile' element={user ? <Profile /> : <Navigate to='/auth' />} />
        <Route path='/chat/:id' element={<Chat />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
