"use client"
import React, { useState, useEffect } from 'react'
import BrandPanel from './BrandPanel'

export default function Partnership() {
  const [role, setRole] = useState('')
  const [ submit, setSubmit ] = useState(false)
  const [ userData, setUserData] = useState({
    name: '',
    type: '',
    files: ''
  })

  const handleInput = (event) => {
    const { name, value } = event.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    console.log(userData)
    event.preventDefault()
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      })
    const res = await response.text()
    console.log(res)
    setRole(res)
  }

  useEffect(()  => {
    const data = async () => {
      const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/auth', {
        method: 'GET',
        credentials: 'include'
      })
      const res = await response.text()
      setRole(res)
    }

    data()
  }, [])

  return (
    <div className='flex justify-center py-10 px-8'>
      {role === 'owner' && 
      <BrandPanel />
      }
      {role === 'pending' && 
      <div className='flex flex-col items-center'>
        <header className='flex flex-col gap-5 text-justify w-[50%]'>
          <p className='text-xl'>Partnership</p>
          <p>We have received your application for verification. Currently, your request is in the approval state. Once we have reviewed your application, you will be notified via email.</p>
        </header>
      </div>
      }

      {role === 'user' &&
        <div className='flex flex-col w-full items-center gap-5'>
        <header className='flex flex-col items-center'>
          <p className='text-xl font-bold'>Partnership</p>
        </header>
        <section className='flex flex-col items-center w-full px-32'>
          <div className='flex flex-col gap-3 items-center text-center w-[80%]'>
            <p>If you want to become a part of our community and sell your products on our website, feel free to fill the form below and submit the form. We will contact with you in 3 business days.</p>
            <a href='#' className='underline text-sm'>More information here</a>
          </div>
        </section>
        <footer className='py-6'>
          <form onSubmit={ handleSubmit } className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <p>Brand name</p>
                <input
                name='name'
                placeholder='Type here...'
                value={userData.name}
                onChange={ handleInput }
                />
              </div>
              <div className='flex flex-col'>
                <p>Your brand theme</p>
                <input
                name='type'
                placeholder='Clothing, accessories...'
                value={userData.type}
                onChange={ handleInput }
                />
              </div>
              <div className='flex flex-col'>
                <p>Product examples</p>
                <input type='file' accept="image/png, image/jpeg, image/jpg" className='border-none p-0'/>
              </div>
            </div>
            <div className='flex flex-col gap-3 my-3 items-center'>
              <div className='flex gap-3'>
                <input type='checkbox' />
                <p>I read information above</p>
              </div>
              <button className='bg-primary px-4 py-3 w-full' type='submit'>Become a brand owner</button>
            </div>
          </form>
        </footer>
        </div>
      }
      
    </div>
  )
}
