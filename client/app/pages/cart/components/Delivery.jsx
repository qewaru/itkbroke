"use client"
import React, { useState, useEffect } from 'react'

export default function Delivery({ onDataSubmit }) {
    const [formData, setFormData] = useState({
        fname: '',
        sname: '',
        email: '',
        country: '',
        city: '',
        zipcode: '',
        address: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        onDataSubmit(formData)
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

  return (
    <>
        <p className='text-lg'>Add your contact information and delivery address</p>
          <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
            <div className='flex flex-row gap-7'>
              <div className='flex flex-col gap-1'>
                <p>First Name</p>
                <input onChange={handleInput} name='fname' type='text' placeholder='John' />
              </div>
              <div className='flex flex-col gap-1'>
                <p>Second Name</p>
                <input onChange={handleInput} name='sname' type='text' placeholder='Doe' />
              </div>
            </div>
              <div className='flex flex-col gap-1 w-full'>
                <p>Email address</p>
                <input name='email' type='text' placeholder='johndoe@example.com' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <p>Country</p>
                <input onChange={handleInput} name='country' type='text' />
              </div>
              <div className='flex flex-col gap-1 w-full'>
                <p>City</p>
                <input onChange={handleInput} name='city' type='text' />
              </div>
              <div className='flex flex-row gap-7'>
                <div className='flex flex-col gap-1'>
                  <p>ZIP Code/Postal code</p>
                  <input onChange={handleInput} name='zipcode' type='text' />
                </div>
                <div className='flex flex-col gap-1'>
                  <p>Address</p>
                  <input onChange={handleInput} name='address' type='text' placeholder='Paper St. 1'/>
                </div>
              </div>
              <button type='submit' className='bg-secondary hover:bg-primary px-4 py-3 my-3 w-full'>Continue</button>
          </form>
    </>
  )
}
