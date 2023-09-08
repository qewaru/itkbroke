"use client"
import React, {useState} from 'react'

export default function Payments() {
  const [toggle, setToggle] = useState(false)
  const handleSwitch = () => {
    setToggle(!toggle)
  }
  return (
    <div onClick={handleSwitch} className={toggle ? 'flex w-[60px] h-[30px] bg-green-600 rounded-full cursor-pointer' : 'flex w-[60px] h-[30px] bg-gray-600 rounded-full cursor-pointer'}>
      <span className={toggle ? ' w-[30px] h-[30px] bg-slate-200 rounded-full ml-[30px] transition-all duration-200' : 'w-[30px] h-[30px] bg-slate-200 rounded-full transition-all duration-200'} />
    </div>
  )
}
