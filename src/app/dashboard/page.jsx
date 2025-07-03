'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Search, Bell, TrendingUp, TrendingDown, Users, UserPlus, UserMinus, Calendar, ChevronDown, Clock, MoreHorizontal, Menu, X, User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaLink, FaRobot, FaWpforms } from "react-icons/fa";


// Import the dashboard components
import DashboardContent from '@/components/dashboard/DashboardContent'
import HiringOnboarding from '@/components/dashboard/HiringOnboarding'
import HRCore from '@/components/dashboard/HRCore'
import BusinessForm from '../form-automation/business-form'
import HighQualityLinksPage from '../high-quality-links/page'
import CompetitorLinksPage from '../competitor-links/page'

function HighQualityBacklinksForm() {
  const [keyword, setKeyword] = useState('');
  const [suffix, setSuffix] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch('https://webnoxdigital.app.n8n.cloud/webhook-test/84886abd-b519-487c-9515-edb3cf05b9d7', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, suffix })
      });
      if (!response.ok) throw new Error('Failed to submit');
      const data = await response.json().catch(() => ({}));
      setResult(data.message || 'Submitted successfully!');
    } catch (err) {
      setError('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Get High Quality Backlinks</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter keyword"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Suffix</label>
          <input
            type="text"
            value={suffix}
            onChange={e => setSuffix(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter suffix"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {result && <div className="mt-4 text-green-600 font-medium">{result}</div>}
      {error && <div className="mt-4 text-red-600 font-medium">{error}</div>}
    </div>
  );
}

const Dashboard = () => {
  // Simple state management
  const [activeTab, setActiveTab] = useState('Employee')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [activePage, setActivePage] = useState('Form Automation') // Set to first sidebar item
  const router = useRouter()

  // Toggle function
  const handleToggle = () => {
    setIsCollapsed(!isCollapsed)
    console.log('Sidebar toggled:', !isCollapsed)
  }

  // Logout function with loader
  const handleLogout = async () => {
    setIsLoggingOut(true)
    console.log('User logging out...')
    
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Show logout toast with red accent
    toast.success('Logged out successfully! See you soon!', {
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
    
    console.log('User logged out')
    
    // Small delay to show toast before navigation
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  // Sidebar menu items
  const sidebarItems = [
    { name: 'Form Automation', icon: <FaWpforms /> },
    { name: 'High Quality Backlinks', icon: <FaLink /> },
    { name: 'Competitor Links', icon: <FaLink /> }
  ]

  // Handle sidebar item click
  const handleSidebarClick = (itemName) => {
    setActivePage(itemName)
  }

  // Stats data
  const statsCards = [
    {
      title: 'Attendance overview',
      value: '120/130',
      percentage: '+11.01%',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-[#1183ff] to-[#5eabff]'
    },
    {
      title: 'Total employee',
      value: '130',
      percentage: '+0.03%',
      icon: <TrendingDown className="w-5 h-5" />,
      gradient: 'from-gray-600 to-gray-800'
    },
    {
      title: 'Job Applicants',
      value: '56',
      percentage: '+15.03%',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-[#1082ff] to-[#5eabff]'
    },
    {
      title: 'Resigned employee',
      value: '40',
      percentage: '-6.08%',
      icon: <TrendingUp className="w-5 h-5" />,
      gradient: 'from-gray-600 to-gray-800'
    }
  ]

  // Meeting data
  const meetings = [
    { name: 'ByeWind', date: 'Jun 24, 2025', time: '12.00 PM', bgColor: '#f6f6f6' },
    { name: 'Natali Craig', date: 'Mar 10, 2025', time: '13.00 PM', bgColor: '#ffffff' },
    { name: 'Drew Cano', date: 'Nov 10, 2025', time: '14.00 PM', bgColor: '#f6f6f6' },
    { name: 'Orlando Diggs', date: 'Dec 20, 2025', time: '15.30 PM', bgColor: '#ffffff' },
    { name: 'Andi Lane', date: 'Jul 25, 2025', time: '16.50 PM', bgColor: '#f6f6f6' }
  ]

  // Function to render content based on active page
  const renderContent = () => {
    switch (activePage) {
      case 'Form Automation':
        return <BusinessForm />
      case 'High Quality Backlinks':
        return <HighQualityLinksPage />
      case 'Competitor Links':
        return <CompetitorLinksPage />
      default:
        return (
          <div className="flex-1 p-6">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {activePage}
                </h1>
                <p className="text-gray-600 text-lg">
                  Coming soon...
                </p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] flex">
      {/* SIDEBAR */}
             <div 
         className="bg-white border-r border-[#ebebeb] flex flex-col fixed left-0 top-0 h-screen z-50 transition-all duration-300 ease-in-out overflow-y-auto overflow-x-visible"
         style={{ width: isCollapsed ? '70px' : '260px' }}
       >
                 {/* Logo Section */}
         <div className="p-4 border-b border-gray-100 flex items-center justify-center">
           <div className="flex items-center">
           <FaRobot className='text-2xl text-blue-500' />
             {!isCollapsed && (
               <span className="ml-3 text-xl font-bold text-gray-800 whitespace-nowrap">SEO Automation</span>
             )}
           </div>
         </div>

        {/* Menu Items */}
         <div className="flex-1 p-4 overflow-y-auto overflow-x-visible">
           {sidebarItems.map((item, index) => (
             <div
               key={index}
               onClick={() => handleSidebarClick(item.name)}
               className={`relative group flex items-center mb-2 px-3 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                 activePage === item.name ? 'bg-[#e8f2ff]' : 'hover:bg-gray-50'
               } ${isCollapsed ? 'justify-center' : ''}`}
               style={{ overflow: 'visible' }}
             >
               <span className="text-lg flex-shrink-0">{item.icon}</span>
               {!isCollapsed && (
                 <span 
                   className={`ml-3 text-sm font-medium whitespace-nowrap ${activePage === item.name ? 'text-[#1d529f]' : 'text-[#a5a5a5]'}`}
                 >
                   {item.name}
                 </span>
               )}
               
               {/* Tooltip for collapsed state */}
               {isCollapsed && (
                 <div 
                   className="fixed px-3 py-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg"
                   style={{ 
                     left: '80px',
                     top: `${80 + (index * 60)}px`,
                     zIndex: 9999
                   }}
                 >
                   {item.name}
                   <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800"></div>
                 </div>
               )}
             </div>
           ))}
         </div>
      </div>

      {/* MAIN CONTENT */}
      <div 
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: isCollapsed ? '70px' : '260px' }}
      >
                 {/* Top Navigation */}
         <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 right-0 z-40 transition-all duration-300 ease-in-out" style={{ left: isCollapsed ? '70px' : '260px' }}>
           {/* Left Side - Toggle Button + Breadcrumb */}
           <div className="flex items-center space-x-4">
             {/* Toggle Button */}
             <button
               onClick={handleToggle}
               className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center"
               type="button"
               title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
             >
               {isCollapsed ? (
                 <Menu className="w-5 h-5 text-gray-600" />
               ) : (
                 <X className="w-5 h-5 text-gray-600" />
               )}
             </button>
             
             {/* Breadcrumb */}
             {/* <div className="flex items-center space-x-2">
               <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
                 Dashboards
               </button>
               <span className="text-gray-300">/</span>
               <button className="px-4 py-2 text-gray-900 font-medium">
                 Overview
               </button>
             </div> */}
           </div>

                     {/* Right Side - Search and Profile */}
           <div className="flex items-center space-x-4">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
               <input
                 type="text"
                 placeholder="Search"
                 className="w-40 h-9 pl-10 pr-4 bg-gray-200/60 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>
             <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
             
             {/* User Dropdown */}
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <button className="w-8 h-8 bg-[#69c0ff] rounded-full flex items-center justify-center hover:bg-[#5ab0ef] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                   <span className="text-white text-sm font-medium">S</span>
                 </button>
               </DropdownMenuTrigger>
               {/* <DropdownMenuContent align="end" className="w-56">
                 <DropdownMenuLabel className="font-normal">
                   <div className="flex flex-col space-y-1">
                     <p className="text-sm font-medium leading-none">Admin User</p>
                     <p className="text-xs leading-none text-muted-foreground">
                       admin@gmail.com
                     </p>
                   </div>
                 </DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem className="cursor-pointer">
                   <User className="mr-2 h-4 w-4" />
                   <span>Profile</span>
                 </DropdownMenuItem>
                 <DropdownMenuItem className="cursor-pointer">
                   <Settings className="mr-2 h-4 w-4" />
                   <span>Settings</span>
                 </DropdownMenuItem>
                 <DropdownMenuSeparator />
                 <DropdownMenuItem 
                   className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 disabled:opacity-50"
                   onClick={handleLogout}
                   disabled={isLoggingOut}
                 >
                   {isLoggingOut ? (
                     <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                   ) : (
                     <LogOut className="mr-2 h-4 w-4" />
                   )}
                   <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                 </DropdownMenuItem>
               </DropdownMenuContent> */}
             </DropdownMenu>
           </div>
         </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex" style={{ marginTop: '64px' }}>
          {renderContent()}
        </div>
      </div>

      


    </div>
  )
}

export default Dashboard