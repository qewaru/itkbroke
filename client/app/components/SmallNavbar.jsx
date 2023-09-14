import React from 'react'
import { BsBag } from 'react-icons/bs'
import { FiUser, FiHome } from 'react-icons/fi'
import { BiStoreAlt } from 'react-icons/bi' 

export default function SmallNavbar() {
  return (
    <footer className='flex items-center visible sm:hidden sticky bottom-0 z-10 w-full h-[60px] bg-second border-t border-secondary'>
      <div className='flex justify-between px-5 w-full'>
        <a href='/' className='flex flex-col items-center'>
          <FiHome size={18} />
          <p className='text-[10px] text-gray-600'>Home</p>
        </a>
        <a href='/pages/store' className='flex flex-col items-center'>
          <BiStoreAlt size={18} />
          <p className='text-[10px] text-gray-600'>Store</p>
        </a>
        <a href='/pages/cart' className='flex flex-col items-center'>
          <BsBag size={18} />
          <p className='text-[10px] text-gray-600'>Cart</p>
        </a>
        <a href='/pages/profile' className='flex flex-col items-center'>
          <FiUser size={18} />
          <p className='text-[10px] text-gray-600'>Profile</p>
        </a>
      </div>
    </footer>
  )
}
