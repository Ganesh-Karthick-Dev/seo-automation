import React, { useState } from 'react'
import { Search, ChevronDown, Plus, MapPin, Briefcase } from 'lucide-react'

const HiringOnboarding = () => {
  const [activeTab, setActiveTab] = useState('Jobs')

  // Job data matching the Figma design exactly
  const jobsData = [
    {
      id: 1,
      title: 'Senior IOS Developer',
      applicants: 25,
      location: 'Coimbatore',
      salary: '30,000 - 35,000',
      experience: '2 years of experience',
      type: 'Full time',
      level: 'Expert',
      filled: 10,
      total: 25,
      progress: 50.7
    },
    {
      id: 2,
      title: 'Junior PHP Developer',
      applicants: 25,
      location: 'Coimbatore',
      salary: '30,000 - 35,000',
      experience: '2 years of experience',
      type: 'Full time',
      level: 'Expert',
      filled: 10,
      total: 25,
      progress: 50
    },
    {
      id: 3,
      title: 'Android Developer',
      applicants: 25,
      location: 'Coimbatore',
      salary: '30,000 - 35,000',
      experience: '2 years of experience',
      type: 'Full time',
      level: 'Expert',
      filled: 10,
      total: 25,
      progress: 50
    },
    {
      id: 4,
      title: 'Node js Developer',
      applicants: 25,
      location: 'Coimbatore',
      salary: '30,000 - 35,000',
      experience: '2 years of experience',
      type: 'Full time',
      level: 'Expert',
      filled: 10,
      total: 25,
      progress: 50
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      applicants: 25,
      location: 'Coimbatore',
      salary: '30,000 - 35,000',
      experience: '2 years of experience',
      type: 'Full time',
      level: 'Expert',
      filled: 10,
      total: 25,
      progress: 50
    },
    {
      id: 6,
      title: 'Senior IOS Developer',
      applicants: 25,
      location: 'Coimbatore',
      salary: '30,000 - 35,000',
      experience: '2 years of experience',
      type: 'Full time',
      level: 'Expert',
      filled: 10,
      total: 25,
      progress: 50
    }
  ]

  return (
    <div className="flex-1" style={{ backgroundColor: '#f5f5f6', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="px-10 py-6" style={{ backgroundColor: '#f5f5f6' }}>
        {/* Breadcrumb and Profile */}
        <div className="flex justify-between items-center mb-6">

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="relative">
              <button 
                className="pb-2 text-base font-semibold"
                style={{ color: '#1c89ff' }}
              >
                Jobs
              </button>
              <div 
                className="absolute bottom-0 left-0 h-0.5 w-9"
                style={{ backgroundColor: '#1c89ff' }}
              ></div>
            </div>
            <button 
              className="pb-2 text-base"
              style={{ color: '#bdbdbd' }}
            >
              Candidates
            </button>
            <button 
              className="pb-2 text-base"
              style={{ color: '#bdbdbd' }}
            >
              Onboarding
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-gray-50" style={{ borderColor: '#bcbcbc' }}>
              <span className="text-sm" style={{ color: '#626262' }}>Role</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg" style={{ borderColor: '#bcbcbc' }}>
              <span className="text-sm" style={{ color: '#626262' }}>Sort by days</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg" style={{ borderColor: '#bcbcbc' }}>
              <span className="text-sm" style={{ color: '#626262' }}>Export</span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#1c89ff' }}>
              <Plus size={16} />
              <span className="text-sm font-medium">Post job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="px-10 pb-10">
        <div className="grid grid-cols-3 gap-6">
          {jobsData.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-lg p-5 "
              style={{ 
                width: '348px', 
                height: '350px',
                borderRadius: '10px'
              }}
            >
              {/* Job Icon and Title Section */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {/* Job Icon Placeholder */}
                  <div className="w-10 h-10 bg-gray-200 rounded-lg mb-3"></div>
                  
                  {/* Job Title */}
                  <h3 
                    className="text-base font-semibold mb-1"
                    style={{ color: '#3897ff' }}
                  >
                    {job.title}
                  </h3>
                  
                  {/* Applicants */}
                  <p 
                    className="text-xs"
                    style={{ color: '#838383' }}
                  >
                    {job.applicants} Applicants
                  </p>
                </div>
              </div>

              {/* Separator Line */}
              <div className="w-full h-px mb-4" style={{ backgroundColor: '#e8e8e8' }}></div>

              {/* Job Details */}
              <div className="space-y-3 mb-6">
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin size={12} style={{ color: '#555555' }} />
                  <span className="text-sm font-medium" style={{ color: '#555555' }}>
                    {job.location}
                  </span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium" style={{ color: '#555555' }}>₹</span>
                  <span className="text-sm font-medium" style={{ color: '#555555' }}>
                    {job.salary} / month
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2">
                  <Briefcase size={12} style={{ color: '#555555' }} />
                  <span className="text-sm font-medium" style={{ color: '#555555' }}>
                    {job.experience}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-6">
                <span 
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: '#ffedf6', 
                    color: '#fd3995' 
                  }}
                >
                  {job.type}
                </span>
                <span 
                  className="px-3 py-1 rounded-lg text-sm font-medium"
                  style={{ 
                    backgroundColor: '#f0ffed', 
                    color: '#03c95a' 
                  }}
                >
                  {job.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div 
                  className="w-full h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#e9edf4' }}
                >
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: '#3897ff',
                      width: `${job.progress}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Progress Text */}
              <p 
                className="text-xs font-medium "
                style={{ color: '#7d7d7d' }}
              >
                {job.filled} of {job.total} filled
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HiringOnboarding 