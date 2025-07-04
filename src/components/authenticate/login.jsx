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
  email: z.string().email('Please enter a valid email address'),
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
      toast.error('Invalid credentials! Please use admin@gmail.com/admin123', {
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
            Webnox Welcomes you
          </h1>
          <p className="text-black text-[14.97px] font-light max-w-[602px] mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, Lorem ipsum dolor sit
          </p>
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
                  type="email"
                  placeholder="Email ID"
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
                  'Continue'
                )}
              </Button>

              
            </form>
          </div>

          {/* OR Divider */}
          <div className="flex flex-col items-center justify-start pt-6 h-[214px] w-[26px]">
            <div className="w-px h-[69px] bg-[#9d9d9d]"></div>
            <div className="py-2">
              <span className="text-[#656565] text-[18px] font-medium">OR</span>
            </div>
            <div className="w-px h-[70px] bg-[#9d9d9d]"></div>
          </div>

          {/* Right Side - Social Login */}
          <div className="w-[367px] space-y-[20px]">
            {/* Google Login */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('Google')}
              className="w-full h-[54px] border border-[#9d9d9d] rounded-[7px] bg-white hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <div className="w-[28px] h-[28px] bg-white rounded flex items-center justify-center">
                <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="text-[#2c2c2c] text-[16.84px] font-semibold">
                Continue with Google
              </span>
            </Button>

            {/* Facebook Login */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('Facebook')}
              className="w-full h-[54px] border border-[#9d9d9d] rounded-[7px] bg-white hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <div className="w-[28px] h-[28px] bg-[#1877F2] rounded flex items-center justify-center">
                <svg className="w-[20px] h-[20px] text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-[#2c2c2c] text-[16.84px] font-semibold">
                Continue with Facebook
              </span>
            </Button>

            {/* Apple Login */}
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('Apple')}
              className="w-full h-[54px] border border-[#9d9d9d] rounded-[7px] bg-white hover:bg-gray-50 flex items-center justify-center gap-3"
            >
              <div className="w-[28px] h-[28px] flex items-center justify-center">
                <svg className="w-[20px] h-[20px] text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <span className="text-[#2c2c2c] text-[16.84px] font-semibold">
                Continue with Apple
              </span>
            </Button>
          </div>
          
        </div>

        {/* Save Password and Forgot Password */}
        <div className="flex items-center w-[65%] justify-start gap-6 mx-auto mt-6">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                                      onClick={() => setValue('savePassword', !savePassword)}
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      savePassword 
                        ? 'bg-[#1b3eed] border-[#1b3eed]' 
                        : 'border-[#9d9d9d] bg-white'
                    }`}>
                      {savePassword && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="text-[#282828] text-[14.97px] font-semibold">
                      Save Password
                    </span>
                  </button>
                </div>
                <button
                  type="button"
                  className="text-[#1b3eed] text-[14.97px] font-semibold hover:underline"
                >
                  Forgot your password
                </button>
              </div>

        {/* Footer Text */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-black text-[14.97px] font-light max-w-[507px] mx-auto">
            By clicking "Continue with Google/Facebook"you agree to our{' '}
            <br />
            Terms & conditions and Privacy policy
          </p>
          <p className="text-black text-[14.97px] font-light">
            Dive into Dashboard{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-[#1b3eed] font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login