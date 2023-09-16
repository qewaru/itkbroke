"use client"
import React, { useState, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'
import Banners from './components/Banners'
import Navbar from './components/Navbar'
import SmallNavbar from './components/SmallNavbar'

export default function Home() {
  useEffect(() => {
    secureLocalStorage.setItem('cart', [])
  }, [])
  return (
    <>
      <Navbar/>
      <Banners />
      <SmallNavbar />
    </>
  )
}
