import React from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'

const source = '/images/banners.png'

export default function Cart() {
  return (
    <section className='py-10 px-14'>
      <header>
        <p className='text-xl font-bold text-primary'>Shopping cart</p>
      </header>
      <section className='px-10 py-3'>
        <div className='flex'>
          <div>
            <div className='flex gap-14 text-lg py-5'>
              <p>Item information</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Size</p>
            </div>
            <div className='flex'>
              <img src={ source } className='w-[200px] h-[200px]' />
              <div className='flex flex-col text-lg gap-3'>
                <p>Brand name</p>
                <p className='text-base'>Item name</p>
              </div>
              <p>00.00 €</p>
              <input type='number' value={1} />
              <select className='bg-secondary py-3 px-6 hover:bg-primary border-none'>
                <option>S</option>
                <option>M</option>
              </select>
              <div className='cursor-pointer'>
                <AiOutlineMinusCircle size={25} />
              </div>
            </div>
            <button className='text-lg bg-secondary hover:bg-primary px-4 py-3'>Empty cart</button>
          </div>
        </div>
        <div>

        </div>
      </section>
    </section>
  )
}
