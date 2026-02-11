import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { EnrollmentForm } from './components/EnrollmentForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <EnrollmentForm />
    </div>
  )
}

export default App
