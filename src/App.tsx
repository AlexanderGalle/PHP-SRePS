import React, { useState } from 'react'
import './App.css'
import Dashboard from './views/Dashboard'
import LoginScreen from './views/Authentication/LoginScreen'

export default () => {
    const [user, setUser] = useState(false)
    if (user) return <Dashboard />
    return <LoginScreen />
}
