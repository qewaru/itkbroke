"use client"
import React, { useState, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'

export default function Review({userData}) {
  const [ data, setData ] = useState([])

  useEffect(() => {
    const storageItems = secureLocalStorage.getItem('cart')
    setData(storageItems)
  }, [])

  const submitData = async (e) => {
    e.preventDefault()
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    const json = await response.json()
    window.location.href = json.url
  }

  return (
    <>
        <p className='text-lg'>Check your information before payment</p>
        <form onSubmit={submitData} className='flex flex-col gap-2 items-center'>
            <p>{userData.fname} {userData.sname}, {userData.email}</p>
            <p>{userData.country}, {userData.city}, {userData.address}, {userData.zipcode}</p>
            <button className='underline'>Edit</button>
            <button type='submit' className='bg-secondary hover:bg-primary px-4 py-3 my-3 min-w-[250px]'>Continue</button>
        </form>
    </>
  )
}
