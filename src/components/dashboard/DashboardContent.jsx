import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Users, UserPlus, UserMinus, Calendar, ChevronDown, Clock, MoreHorizontal, User } from 'lucide-react'

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('Employee')

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

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Employee Dashboard Section */}
      <div className="mb-8">
        {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">📊 Dashboard Overview</h2> */}
        
        {/* Tab Navigation */}
        {/* <div className="flex space-x-6 mb-6">
          {['Employee', 'All', 'Analyst'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-r ${card.gradient} rounded-lg p-6 text-white`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>{card.icon}</div>
                <div className="text-xs opacity-80">{card.percentage}</div>
              </div>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <div className="text-sm opacity-80">{card.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Analytics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Analytics Overview</h3>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">Active Employees</span>
              </div>
              <span className="text-lg font-bold text-gray-800">128</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <UserPlus className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">New Hires</span>
              </div>
              <span className="text-lg font-bold text-gray-800">12</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <UserMinus className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-sm font-medium text-gray-700">Departures</span>
              </div>
              <span className="text-lg font-bold text-gray-800">3</span>
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Meetings */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h3>
            <button className="text-blue-600 text-sm hover:text-blue-700">
              View all
            </button>
          </div>
          
          <div className="space-y-3">
            {meetings.map((meeting, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50"
                style={{ backgroundColor: meeting.bgColor }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{meeting.name}</div>
                    <div className="text-xs text-gray-500">{meeting.date}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {meeting.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent 