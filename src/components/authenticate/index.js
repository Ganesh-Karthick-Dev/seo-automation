'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Login from './login'
import Signup from './signup'

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleLogin = async (data) => {
    // Check credentials
    if (data.email === 'admin@gmail.com' && data.password === 'admin123') {
      // Small delay before redirect (toast is handled in login component)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      // Error will be handled in login component
      throw new Error('Invalid credentials')
    }
  }

  const handleSignup = (data) => {
    console.log('Signup data:', data)
    toast.success('Signup successful! Welcome to HRMS!')
    // Add your signup logic here
  }

  const switchToSignup = () => {
    setIsLogin(false)
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  return (
    <>
      {isLogin ? (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={switchToSignup}
        />
      ) : (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </>
  )
}

export default AuthContainer 