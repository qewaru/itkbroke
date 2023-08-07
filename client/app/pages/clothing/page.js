"use client"
import React from "react"
import Filter from './components/Filter'

const source = '/images/banners.png'

export default function Clothing() {
  return (
    <>
      <Filter />
      <section>
        <div className="flex justify-center w-full h-full py-[75px]">
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
        </div>
      </section>
    </>
  )
}
