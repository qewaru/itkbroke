"use client"
import React, { useState } from 'react'

export default function page() {
    const [toggle, setToggle] = useState(false)
    const handleToggle = () => {
        setToggle(!toggle)
      }
  return (
    <>
        <button onClick={ handleToggle } className="absolute right-0 bg-secondary py-3 px-6 peer hover:bg-primary flex items-center gap-2">
            All filters
        </button>
        <div className={` top-0 left-0 fixed w-full h-screen bg-black/50 ${toggle ? 'fixed' : 'hidden'}`}>
            
        </div>
        <div className={`transition duration-300 ease-in-out fixed top-0 left-0 bg-accent w-[30%] h-screen ${toggle ? 'translate-x-0' : 'translate-x-[-100%]'}`}>

        </div>
    </>
    
  )
}
