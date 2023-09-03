import './globals.css'
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import PopWindow from './components/PopWindow'

export const metadata = {
  title: 'itkbroke',
  description: 'From broke people to broke people',
}

export default function RootLayout({ children }) {
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
    <html lang="en">
      <body>
        {showWindow && <PopWindow />}
        <Navbar />
        {children}
      </body>
    </html>
  )
}
