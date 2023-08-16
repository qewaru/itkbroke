"use client"
import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'

export default function Partnership() {
  const [role, setRole] = useState('')
  const [ submit, setSubmit ] = useState()
  const [ email, setEmail ] = useState({
    email: ''
  })

  const handleInput = (event) => {
    const {name, value} = event.target
    setEmail((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch('http://localhost:4000/api/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      })
    const data = response.text()
    console.log(data)
  }

  useEffect(()  => {
    const data = async () => {
      const response = await fetch('http://localhost:4000/api/auth', {
        method: 'GET',
        credentials: 'include'
      })
      const res = await response.text()
      setRole(res)
    }

    data()
  }, [])

  return (
    <div className='flex justify-center py-10'>
      {role === 'owner' && 
      <p>Welcome!</p>
      }
      {role === 'pending' && 
      <p>We recieved your application for verification, currently, your request is on approval state. As soon as we consider your application, you will be notified on your email.</p>
      }

      {role === 'user' &&
        <div className='flex flex-col'>
        <header className='flex flex-col items-center'>
          <p className='text-xl'>Partnership</p>
          <div>
            <p>Information</p>
            <p>If you want to become a part of a custom brand community and sell your products on our website</p>
          </div>
        </header>
        <section>
          <form onSubmit={ handleSubmit } className='flex flex-col w-[200px]'>
            <input placeholder='Your email' name='email' value={ email.email } onChange={ handleInput } />
            <button type='submit'>Sumbit</button>
          </form>
        </section>
        </div>
      }
      
    </div>
  )
}
