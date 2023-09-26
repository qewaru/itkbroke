"use client"
import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import secureLocalStorage from 'react-secure-storage'

const source = '/images/banners.png'

export default function Page({ params }) {
    const [data, setData] = useState([])
    const [ toggleAdd, setToggleAdd ] = useState(false)
    const [ size, setSize ] = useState('')

    const handleSize = (event) => {
        setSize(event.target.value)
    }

    const handleAdd = async () => {
        setToggleAdd(true)
        setTimeout(() => {
            setToggleAdd(false)
        }, 5000)

        const itemData =  {
            id: data._id,
            size: size
        }

        let storageArray = secureLocalStorage.getItem('cart')
        if (!storageArray) {
            storageArray = []
        }
        storageArray.push(itemData)
        secureLocalStorage.setItem('cart', storageArray)
    }

    useEffect(() => {
        fetchData()
      }, [])
    
      const fetchData = async () => {
        const name = params.name
        const response = await fetch(`https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/item/${name}`, {
          method: 'GET',
        })
        const jsonResponse = await response.json()
        setData(jsonResponse)
    }

    return (
    <>
        {toggleAdd && 
            <div className='flex justify-center items-center text-lg stiicky w-full h-[50px] bottom-0 z-10 bg-success'>
                <p className='text-background'>Added to <a href='/pages/cart' className='underline text-background'>cart</a></p>
            </div>
        }
        <section className='relative flex justify-center w-full h-full py-10 px-5 semimd:px-0 text-lg'>
            
            <div className='flex flex-col'>
                <div className='text-lg'>
                    <a className='hover:text-primary' href='/'>Home \ </a>
                    <a className='hover:text-primary' href='/pages/clothing'>Clothing  \ </a>
                    <a className='hover:text-primary' href={`/pages/clothing${data.shortName}`}>{data.name}</a>
                </div>
                <div className='flex flex-col gap-10 lg:flex-row lg:gap-24'>
                    <div className='flex flex-col '>
                        <div className='flex items-center justify-center gap-5 my-10'>
                            <MdKeyboardArrowLeft size={30} className='cursor-pointer' />
                            <img src={ data.files } className='w-[250px] sm:w-[300px] md:w-[500px] md:h-[500px]' />
                            <MdKeyboardArrowRight size={30} className='cursor-pointer' />
                        </div>
                        <div>
                        <div className='grid-cols-5 gap-5 my-10 hidden sm:grid'>
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                            <img src={ source } className='w-[70px] h-[70px] cursor-pointer' />
                        </div>
                        <div>
                            {/* rounded things */}
                        </div>
                        </div>
                    </div>
                    <div className='flex flex-col my-8 w-full justify-between md:flex-row semimd:flex-col lg:w-[400px] lg:justify-normal'>
                        <div className='w-full'>
                            <div>
                                <a className='text-xl font-bold hover:text-primary' href='/'>Brand Name</a>
                                <p>{data.name}</p>
                                <p>{data.price} €</p>
                            </div>
                            <div className='flex flex-col gap-8 my-12'>
                                <select onChange={handleSize} className='bg-secondary py-3 px-6 hover:bg-primary border-none rounded-xl'>
                                    {data.sizes?.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <button onClick={handleAdd} className={toggleAdd === true ? 'bg-transparent py-3 px-6 hover:bg-transparent border-2 border-secondary' : 'bg-secondary py-3 px-6 hover:bg-primary'} >
                                    {toggleAdd === true ? 'Added to cart' : 'Add to cart'}
                                </button>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex justify-between border-b border-b-[#FFFFFF]/20'>
                                <nav className='mx-2 px-2 border-b border-b-primary text-primary'>Details</nav>
                            </div>
                            <div className='my-2'>
                                <ul>
                                    <li>{'> lorem ipsum'}</li>
                                    <li>{'> lorem ipsum'}</li>
                                    <li>{'> lorem ipsum'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    ) 
}
