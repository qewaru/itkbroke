"use client"
import React, { useState } from 'react'
import { FiUser, FiMenu } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { BsBag } from 'react-icons/bs'
import Link from 'next/link'

export default function Navbar() {
  const [toggle, setToggle] = useState(false)

  const links = [
    ['New in', '/pages/new'],
    ['Brands', '/pages/brands'],
    ['Clothing', '/pages/clothing'],
    ['Accessories', '/pages/accessories'],
    ['Sale', '/pages/sale'],
  ]

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <header className='w-full h-[50px] border-b border-b-primary/50'>
      <div className='flex items-center justify-between w-full h-full'>
        <div className='w-[80px] ml-5'>
          <Link href='/'>
            <img src='/images/zxcursed.gif' className='w-[30px] rounded-full'/>
          </Link>
        </div>
        <div className='hidden semimd:flex gap-12 text-xl'>
            {links.map(([title, url], index) => (
              <a key={index} href={url} className='hover:text-primary'>{title}</a>
            ))}
        </div>
        <div className='hidden semimd:flex gap-7 w-[80px] mr-5 '>
            <a href="/pages/cart"><BsBag size={20}/></a>
            <a href="/pages/profile"><FiUser size={23}/></a>
        </div>
        <div onClick={ handleToggle } className='hidden sm:block semimd:hidden mr-5 cursor-pointer'>
          <FiMenu size={25} />
        </div>
      </div>
        
        <div className={toggle ? 'semimd:hidden fixed left-0 top-0 w-full h-screen bg-black/50' : ''}>
          <aside className={
              toggle
                ? 'fixed right-0 top-0 w-[350px] h-screen bg-black ease-in-out duration-300'
                : 'fixed right-[-100%] top-0 p-10 ease-in-out duration-300'
          }>
            <header>
              <div onClick={handleToggle}>
                <IoIosClose size={35} />
              </div>
            </header>
            <section className='flex flex-col h-full justify-between pt-5 pb-16 px-6'>
              <div className='flex flex-col gap-4 items-end'>
                {links.map(([title, url], index) => (
                  <a key={index} href={url} className='hover:text-primary focus:text-primary text-lg'>{title}</a>
                ))}
              </div>
              <div className='flex flex-col gap-4 items-end'>
                <a href='/pages/cart'>Cart</a>
                <a href='/pages/profile'>Profile</a>
              </div>
            </section>
          </aside>
        </div>
    </header>
  )
}

