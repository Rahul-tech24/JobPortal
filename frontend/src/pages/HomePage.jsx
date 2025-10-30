
import React from 'react'
import { Button } from '../components/ui/button'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
    <div className="pt-24 pb-16 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-6">
          Welcome to <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">JobPortal</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Discover your next career opportunity with thousands of jobs from top companies around the world.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white px-8 py-3 text-lg font-medium shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 rounded-xl">
            Find Jobs
          </Button>
          <Button variant="outline" className="border-2 border-slate-600 hover:border-cyan-400 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-800/60 hover:to-slate-700/60 px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300">
            Post a Job
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomePage
