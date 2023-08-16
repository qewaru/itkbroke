import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'

const source = '/images/banners.png'
const size = ['XS', 'S', 'M', 'L', 'XL']

export default function Page({ params }) {
    return <>
        <section className='flex justify-center w-full h-full py-12 text-lg'>
            <div className='flex flex-col'>
                <div className='text-lg'>
                    <a className='hover:text-primary' href='/'>Home \ </a>
                    <a className='hover:text-primary' href='/'>Clothing  \ </a>
                    <a className='hover:text-primary' href='/'>{params.name}</a>
                </div>
                <div className='flex flex-col gap-10 lg:flex-row lg:gap-24'>
                    <div className='flex flex-col '>
                        <div className='flex items-center justify-center gap-5 my-10'>
                            <MdKeyboardArrowLeft size={30} className='cursor-pointer' />
                            <img src={ source } className='w-[300px] md:w-[500px] md:h-[500px]' />
                            <MdKeyboardArrowRight size={30} className='cursor-pointer' />
                        </div>
                        <div className='grid grid-cols-5 gap-5 my-10'>
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
                    </div>
                    <div className='flex flex-col my-8 w-full justify-between md:flex-row lg:w-[400px] lg:justify-normal'>
                        <div className='w-[50%] lg:w-full'>
                            <div>
                                <a className='text-xl font-bold hover:text-primary' href='/'>Brand Name</a>
                                <p>{params.name}</p>
                                <p>00.00 €</p>
                            </div>
                            <div className='flex flex-col gap-8 my-12'>
                                <select value='S' className='bg-secondary py-3 px-6 hover:bg-primary border-none'>
                                    {size.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}                            
                                </select>
                                <button className='bg-secondary py-3 px-6 hover:bg-primary'>Add to cart</button>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex justify-between border-b border-b-[#FFFFFF]/20'>
                                <button className='mx-2 px-2 border-b border-b-primary text-primary'>Details</button>
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
}
