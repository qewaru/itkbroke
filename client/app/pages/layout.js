"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import PopWindow from '../components/PopWindow'
import SmallNavbar from '../components/SmallNavbar'

export default function MainLayout({children}) {
    const [showWindow, setShowWindow] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
          const hasShownWindow = localStorage.getItem('hasShownWindow')
          if (!hasShownWindow) {
            setShowWindow(true)
            localStorage.setItem('hasShownWindow', 'true')
          }
        }, 1000);
    
        return () => clearTimeout(timer);
    }, []);
  return (
    <>
        {showWindow && <PopWindow />}
        <Navbar />
        {children}
        <SmallNavbar />
    </>
  )
}
