import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const source = '/images/banners.png'

export default function Brand({params}) {
  return (
    <>
    <section className='flex justify-center px-20'>
        <div className='w-full h-full py-10 border-b border-b-secondary'>
        <header className='flex flex-col'>
            <div className='text-lg mb-10'>
                <a className='hover:text-primary' href='/'>Home \ </a>
                <a className='hover:text-primary' href='/'>Brands  \ </a>
                <a className='hover:text-primary' href='/'>{params.name}</a>
            </div>
        </header>
        <footer className='flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-0'>
            <div className='mr-0 md:mr-20'>
                <img src={source} className='w-[300px]' />
            </div>
            <div className='flex flex-col items-center md:items-baseline'>
                <p className='text-xl text-primary font-bold'>{params.name}</p>
                <div className='my-7'>
                    <div className='flex'>
                        <p>Author: </p>
                        <p>???@???.com</p>
                    </div>
                    <div className='flex'>
                        <p>Theme: </p>
                        <p>???</p>
                    </div>
                    <div className='flex'>
                        <p>Delivery: </p>
                        <p>???</p>
                    </div>
                </div>
                <button className='flex gap-3 bg-secondary py-2 px-5 hover:bg-primary'>
                    <AiOutlineHeart size={25} />
                    Follow
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
            <a href="/" className="flex flex-col items-center cursor-pointer">
              <img src={ source } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
              <div className="flex flex-col items-center py-5">
                <p className="text-lg">Brand name</p>
                <p>Item name</p>
                <p>00.00 €</p>
              </div>
            </a>
            <a href="/" className="flex flex-col cursor-pointer">
              <img src={ source } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
              <div className="flex flex-col items-center py-5">
                <p className="text-lg">Brand name</p>
                <p>Item name</p>
                <p>00.00 €</p>
              </div>
            </a>
            <a href="/" className="flex flex-col cursor-pointer">
              <img src={ source } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
              <div className="flex flex-col items-center py-5">
                <p className="text-lg">Brand name</p>
                <p>Item name</p>
                <p>00.00 €</p>
              </div>
            </a>
          </div>
        </section>
    </section>
    </>
  )
}
