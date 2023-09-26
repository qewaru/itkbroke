"use client"
import React, { useState, useEffect } from 'react'
import { BsHeartFill, BsHeartbreakFill} from 'react-icons/bs'
import secureLocalStorage from 'react-secure-storage'

export default function Brand({params}) {
  const [data, setData] = useState([])
  const [ itemData, setItemData ] = useState([])
  const [ clicked, setClicked ] = useState(false)

  useEffect(() => {
    fetchData()
    fetchItems()
  }, [])

  const fetchData = async () => {
    const name = params.shortName
    const response = await fetch(`https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/brand/${name}`, {
      method: 'GET',
      credentials: 'include',
    })
    const jsonResponse = await response.json()
    setData(jsonResponse)
  }

  const fetchItems = async () => { 
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getBrandItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(params),
    })

    const json = await response.json()
    setItemData(json)
  }

  const handleFollow = async () => {
    const id = { _id: data._id}
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/setFollow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(id)
    })

    const reply = await response.json()
    if (reply.follow === 'active') {
      setClicked(true)
    } else {
      setClicked(false)
    }
  } 

  return (
    <>
      <section className='flex justify-center px-20'>
        <div className='w-full h-full py-10 border-b border-b-secondary'>
        <header className='flex flex-col'>
            <div className='text-lg mb-10'>
                <a className='hover:text-primary' href='/'>Home \ </a>
                <a className='hover:text-primary' href='/'>Brands  \ </a>
                <a className='hover:text-primary' href='/'>{data.name}</a>
            </div>
        </header>
        <footer className='flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-0'>
            <div className='mr-0 md:mr-20'>
                <img src={data.logo} className='w-[300px]' />
            </div>
            <div className='flex flex-col items-center md:items-baseline'>
                <p className='text-xl text-primary font-bold'>{data.name}</p>
                <div className='my-7'>
                    <div className='flex gap-2'>
                        <p>Author: </p>
                        <p>{data.email}</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Theme: </p>
                        <p>{data.type}</p>
                    </div>
                    <div className='flex gap-2'>
                        <p>Followers: </p>
                        <p>{data.followCount}</p>
                    </div>
                </div>
                <button onClick={handleFollow} className='flex gap-3 bg-secondary py-2 px-5 hover:bg-primary'>
                    {clicked ? 
                    <>
                      <BsHeartFill size={25} /> 
                      <>Followed</>
                    </> 
                    : 
                    <>
                      <BsHeartFill size={25} />
                      <>Follow</>
                    </> }
                </button>
            </div>
        </footer>
        </div>
    </section>
    <section className='flex flex-col py-10'>
        <header className='flex justify-center'>
            <p className='text-xl font-bold text-primary'>Products</p>
        </header>
        <section className="flex justify-center w-full h-full py-[75px]">
          <div className="grid grid-cols-1 gap-16 lg:gap-24 lg:grid-cols-3 semimd:grid-cols-2">
            {itemData.map((item, index) => (
              item.sale === 'no' ?
              <nav key={index} href="/" className="flex flex-col items-center cursor-pointer">
                <img src={item.files} className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
                <div className="flex flex-col items-center py-5">
                  <p className="text-lg">{item.brandName}</p>
                  <p>{item.name}</p>
                  <p>{item.price} €</p>
                </div>
              </nav>
              :
              <nav key={index} onClick={() => handleLink(item._id)} className="flex flex-col items-center cursor-pointer">
                <div className="absolute flex justify-center items-center w-[50px] h-[25px] text-sm bg-primary">
                  <p>- {item.salePercent}%</p>
                </div>
                <img src={ item.files } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
                <div className="flex flex-col items-center py-5">
                  <p className="text-lg">{ item.brandName }</p>
                  <p>{ item.name }</p>
                  <div className="flex gap-4">
                    <p className="text-accent">{ item.salePrice } €</p>
                    <p className="text-white/50 line-through">{ item.price } €</p>
                  </div>
                </div>
              </nav>
            ))}
            
          </div>
        </section>
    </section>
    </>
  )
}
