'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Login from './login'

const AuthContainer = () => {
  const router = useRouter()

  const handleLogin = async (data) => {
    // Check credentials
    if (data.email === 'WebnoxSEO' && data.password === 'Webnox@seo123') {
      // Small delay before redirect (toast is handled in login component)
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } else {
      // Error will be handled in login component
      throw new Error('Invalid credentials')
    }
  }

  return (
    <Login 
      onLogin={handleLogin}
      onSwitchToSignup={null}
    />
  )
}

export default AuthContainer 