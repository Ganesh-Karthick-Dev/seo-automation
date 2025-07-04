'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Check } from 'lucide-react'
import { Button } from '../ui/button.jsx'
import { Input } from '../ui/input.jsx'
import { Label } from '../ui/label.jsx'

// Validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  savePassword: z.boolean().default(false)
})

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      savePassword: false
    }
  })

  const savePassword = watch('savePassword')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Show loading for better UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Show success toast with green accent
      toast.success('Login successful! Welcome back!', {
        style: {
          background: '#16a34a',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#16a34a',
        },
      })
      
      if (onLogin) {
        await onLogin(data)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Invalid credentials! Please use WebnoxSEO/Webnox@seo123', {
        style: {
          background: '#dc2626',
          color: '#fff',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
          borderRadius: '8px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#dc2626',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Continue with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px]">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[44px] font-bold text-black mb-2">
            Webnox Seo Automation
          </h1>
          {/* <p className="text-black text-[14.97px] font-light max-w-[602px] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, Lorem ipsum dolor sit
          </p> */}
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center gap-6 max-w-[885px] mx-auto">
          {/* Left Side - Login Form */}
          <div className="w-[367px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[20px]">
              {/* Email Field */}
              <div className="relative">
                <Input
                  id="email"
                  type="text"
                  placeholder="Username"
                  className="w-full h-[51px] border border-[#9d9d9d] rounded-[7px] px-4 text-[14.97px] font-medium text-[#656565] placeholder:text-[#656565] focus:border-[#1b3eed] focus:ring-1 focus:ring-[#1b3eed]"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full h-[51px] border border-[#9d9d9d] rounded-[7px] px-4 text-[14.97px] font-medium text-[#656565] placeholder:text-[#656565] focus:border-[#1b3eed] focus:ring-1 focus:ring-[#1b3eed]"
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#656565]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#656565]" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full h-[51px] bg-[#1b3eed] disabled:bg-[#9d9d9d] text-white font-semibold text-[14.97px] rounded-[7px] transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              
            </form>
          </div>


          
        </div>



        {/* Footer Text */}
        {/* <div className="text-center mt-8 space-y-2">
          <p className="text-black text-[14.97px] font-light max-w-[507px] mx-auto">
            By clicking "Continue with Google/Facebook"you agree to our{' '}
            <br />
            Terms & conditions and Privacy policy
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default Login