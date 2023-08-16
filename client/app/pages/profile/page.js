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
        <aside className='w-[500px] h-screen p-8'>
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
        <aside className='w-[500px] h-screen p-8'>
            <div className='flex flex-col'>
                <p className='text-bold text-xl'>Your profile</p>
                <div className='flex flex-col text-lg my-10 px-5 gap-5'>
                    <div onClick={ () => handleType('account') } className='flex cursor-pointer gap-3'>
                        <FiUser size={25} />
                        <p className='hover:text-primary'>Account</p>
                    </div>
                    <div onClick={ () => handleType('payments') } className='flex cursor-pointer gap-3'>
                        <BiCreditCard size={25} />
                        <p className='hover:text-primary'>Payments</p>
                    </div>
                    <div onClick={ () => handleType('history') } className='flex cursor-pointer gap-3'>
                        <AiOutlineHistory size={25} />
                        <p className='hover:text-primary'>History</p>
                    </div>
                    <div onClick={ () => handleType('following') } className='flex cursor-pointer gap-3'>
                        <AiOutlineHeart size={25} />
                        <p className='hover:text-primary'>Following</p>
                    </div>
                </div>
                <div onClick={ () => handleType('partnership') } className='flex cursor-pointer text-lg my-5 px-5 gap-3'>
                    <RiGroupLine size={25} />
                    <p className='hover:text-primary'>Partnership</p>
                </div>
            </div>
        </aside>
        <section className='bg-[#111215] w-full'>
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
