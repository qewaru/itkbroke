"use client"
import React, { useState, useEffect } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

export default function Account() {
  const [ data, setData ] = useState([])
  
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/api/userInfo', {
      method: 'GET',
      credentials: 'include'
    })
    const jsonResponse = await response.json()
    setData(jsonResponse)
  }

  return (
    <div className='flex justify-center gap-36 py-10'>
      <div className='flex flex-col'>
        <div className='flex text-xl gap-3 items-center'>
          <p>{data.name1} {data.name2}</p>
          <div className='cursor-pointer'>
            <AiOutlineEdit size={20} />
          </div>
        </div>
        <div className='flex flex-col text-xl my-5'>
          <p>Email</p>
          <div className='flex text-lg gap-3 items-center'>
            <p>{data.email}</p>
            <div className='cursor-pointer'>
              <AiOutlineEdit size={20} />
            </div>
          </div>
        </div>
        <form className='flex flex-col gap-3 text-xl'>
          <p>Change password</p>
          <div className='text-lg'>
            <p>Old password</p>
            <input placeholder='Type here...' />
          </div>
          <div className='text-lg'>
            <p>New password</p>
            <input placeholder='Type here...' />
          </div>
          <div className='text-lg'>
            <p>Confirm new password</p>
            <input placeholder='Type here...' />
          </div>
          <div className='flex justify-center my-2'>
            <button className='text-lg bg-secondary hover:bg-primary px-4 py-3'>Update password</button>
          </div>
        </form>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-3'>
          <p className='text-xl'>Notifications</p>
          <div className='flex flex-col gap-2 text-lg'>
            <div className='flex'>
              <input type='checkbox' />
              <p>Turn on/off all notifications</p>
            </div>
            <div className='flex'>
              <input type='checkbox' />
              <p>Newsletter</p>
            </div>
            <div className='flex'>
              <input type='checkbox' />
              <p>Following brands</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-5 text-xl max-w-[400px]'>
          <p className='text-primary'>Delete account</p>
          <p className='break-words'>Once you delete your account, you cannot restore it!</p>
          <div className='flex gap-3'>
            <input type='checkbox'/>
            <p className='text-sm'>I confirm that I want to delete my account without the possibility of recovery</p>
          </div>
          <button className='text-lg bg-secondary hover:bg-primary px-4 py-3'>Delete account</button>
        </div>
      </div>
    </div>
  )
}
