"use client"
import React, { useState, useEffect } from 'react'

const source = '/images/banners.png'

export default function History() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getHistory', {
      method: 'GET',
      credentials: 'include'
    })
    const json = await response.json()
    setData(json)
  }

  return (
    // <div className='flex flex-col w-full p-10'>
    //   <div className='flex items-center py-3 gap-10'>
    //     <p className='text-lg'>00:00, dd/mm/yy</p>
    //     <a href='/' className='flex gap-10 items-center border-l border-l-secondary px-10 text-lg'>
    //       <img src={ source } className='w-[120px] h-[120px]'/>
    //       <div className='flex flex-col text-lg gap-1'>
    //         <p>Brand name</p>
    //         <p className='text-base'>Item name</p>
    //       </div>
    //       <p>00.00 €</p>
    //     </a>
    //   </div>
    // </div>
    <>
    {
      data ? <p>Data</p> : <p>No data</p>
    }
    </>
    
  )
}
