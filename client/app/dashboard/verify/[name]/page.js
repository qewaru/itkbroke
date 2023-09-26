"use client"
import React, { useState, useEffect } from 'react'

export default function Page() {
    const [ data, setData ] = useState([])

    useEffect(() => {
        const brandData = localStorage.getItem('brandData')
        setData(JSON.parse(brandData))
    }, [])

    const handleSubmit = async (state) => {
        const request = { status: state, data: data }
        const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/updateVerify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            })
            if (response.status === 200) {
                localStorage.removeItem('brandData')
                window.location.href = '/dashboard'
            } else if (response.status === 400) {
                localStorage.removeItem('brandData')
                window.location.href = '/dashboard'
            }
    }

    return (
        <>
                    <div>
                        <p className='text-xl font-bold'>Brand name</p>
                        <p>{data.name}</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Brand type</p>
                        <p>{data.type}</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Owner email</p>
                        <p>{data.type}</p>
                    </div>
                    <div>
                        <p className='text-xl font-bold'>Attachments</p>
                        <p>{data.files}</p>
                    </div>
                    <div className='flex gap-3 py-5'>
                        <button onClick={ () => handleSubmit('allow') } className='bg-slate-800 py-2 px-3 hover:bg-slate-500'>Allow</button>
                        <button onClick={ () => handleSubmit('deny') } className='bg-slate-800 py-2 px-3 hover:bg-slate-500'>Deny</button>
                    </div>
                </>
  )
}
