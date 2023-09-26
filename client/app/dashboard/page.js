"use client"
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Page() {
  const [admin, setAdmin] = useState(false)
  const [data, setData] = useState([])
  const [brandData, setBrandData] = useState([])

  const handleLink = (email) => {
    const array = data.find((user) => user.email === email)
    localStorage.setItem('brandData', JSON.stringify(array))
    window.location.href = `/verify/${ array.name }`
  }

  useEffect(() => {
    const adminCheck = sessionStorage.getItem('isAdmin')
    if (adminCheck) {
      setAdmin(true)

      const data = async () => {
        const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getUsers', {
          method: 'GET',
        })
        const jsonResponse = await response.json()
        setData(jsonResponse)
      }
      
      data()

      const brandList = async () => {
        const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getBrands', {
          method: 'GET',
        })
        const json = await response.json()
        setBrandData(json)
      }

      brandList()
    }
  }, [])
  
  return (
    <>
    { admin &&
      <>
        <section className='w-full h-screen'>
          <div className='flex gap-5'>
            <div className='flex flex-col gap-5 bg-gray-400 p-3'>
              <header>
                <p className='text-xl font-bold text-black'>Brand verification</p>
              </header>
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Files</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                   {data.map((user, index) => (
                      <>
                        <tr key={index}>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.type}</td>
                          <td>{user.date}</td>
                          <td>-</td>
                          <td>
                            <p>Pending</p>
                          </td>
                          <td>
                            {/* <a 
                            href={`/dashboard/verify/${user.name}`}
                            onClick={ () => handleLink(user.email) }
                            className='bg-slate-800 p-1 hover:bg-slate-500'>Change</a> */}
                            <button onClick={ () => handleLink(user.email)} className='bg-slate-800 p-1 hover:bg-slate-500' >Change</button>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='flex flex-col gap-5 bg-gray-400 p-3'>
            <header>
                <p className='text-xl font-bold text-black'>Brand List</p>
              </header>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Release date</th>
                    <th>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {brandData.map((item, index) => (
                    <>
                      <tr>
                        <td>{ item.name }</td>
                        <td>{ item.email }</td>
                        <td>{ item.date }</td>
                        <td>-</td>
                        <td>
                          <a href='#' className='bg-slate-800 p-1 hover:bg-slate-500'>View</a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    }
    {!admin && <p>HTTP 403 Access forbidden</p>}
    </>
  )
}
