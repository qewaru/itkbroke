"use client"
import React, { useState, useEffect } from 'react'
import Account from './components/Account'
import LogAccount from './components/LogAccount'
import Payments from './components/Payments'
import History from './components/History'
import Following from './components/Following'
import Partnership from './components/Partnership'

import { FiUser } from 'react-icons/fi'
import { BiCreditCard } from 'react-icons/bi'
import { AiOutlineHistory, AiOutlineHeart } from 'react-icons/ai'
import { RiGroupLine } from 'react-icons/ri'

export default function Profile() {
    const [type, setType] = useState('account')
    const [status, setStatus] = useState()

    const handleType = (objectType) => {
        setType(objectType)
    }

    useEffect(() => {
        const hasLoggedIn = localStorage.getItem('hasLoggedIn')
        if (hasLoggedIn) {
            setStatus(true)
        } else {
            setStatus(false)
        }
      }, [])

  return (
    <>
    {status === false &&
    <section className='flex'>
        <aside className='w-[500px] h-screen p-8 bg-background/40'>
            <div className='flex flex-col'>
                <p className='text-bold text-xl'>Your profile</p>
                <div className='flex flex-col text-lg my-10 px-5 gap-5'>
                    <div onClick={ () => handleType('account') } className='flex cursor-pointer gap-3'>
                        <FiUser size={25} />
                        <p className='hover:text-primary'>Account</p>
                    </div>
                </div>
            </div>
        </aside>
        <section className='bg-[#111215] w-full'>
            {type === 'account' && <LogAccount />}
        </section>
    </section>
    }

    {status === true && 
    <section className='flex'>
        <aside className='w-[10%] sm:w-[30%] lg:w-[20%] h-screen p-0 sm:p-8 bg-background/40'>
            <div className='flex flex-col'>
                <p className='text-bold text-xl hidden sm:block'>Your profile</p>
                <div className='flex flex-col text-lg my-10 md:px-5 gap-5 items-center md:items-start'>
                    <div onClick={ () => handleType('account') } className='flex cursor-pointer gap-3 items-center'>
                        <FiUser className='w-[20px] md:[25px]' />
                        <p className='hover:text-primary hidden sm:block'>Account</p>
                    </div>
                    <div className='flex cursor-pointer gap-3 items-center'>
                        <BiCreditCard className='w-[20px] md:[25px]' />
                        <p className='hover:text-primary hidden sm:block'>Payments</p>
                    </div>
                    <div onClick={ () => handleType('history') } className='flex cursor-pointer gap-3 items-center'>
                        <AiOutlineHistory className='w-[20px] md:[25px]' />
                        <p className='hover:text-primary hidden sm:block'>History</p>
                    </div>
                    <div onClick={ () => handleType('following') } className='flex cursor-pointer gap-3 items-center'>
                        <AiOutlineHeart className='w-[20px] md:[25px]' />
                        <p className='hover:text-primary hidden sm:block'>Following</p>
                    </div>
                </div>
                <div onClick={ () => handleType('partnership') } className='flex cursor-pointer justify-center md:justify-start text-lg my-5 md:px-5 gap-3 items-center'>
                    <RiGroupLine className='w-[20px] md:[25px]' />
                    <p className='hover:text-primary hidden sm:block'>Partnership</p>
                </div>
            </div>
        </aside>
        <section className='bg-[#111215] w-[90%] sm:w-[80%]'>
            {type === 'account' && <Account />}
            {type === 'payments' && <Payments />}
            {type === 'history' && <History />}
            {type === 'following' && <Following />}
            {type === 'partnership' && <Partnership />}
        </section>
    </section>
    }
    </>
  )
}
