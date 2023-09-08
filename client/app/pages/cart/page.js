import React from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'

const source = '/images/banners.png'

export default function Cart() {
  return (
    <section className='py-10 px-14'>
      <header>
        <p className='text-xl font-bold text-primary'>Shopping cart</p>
      </header>
      <section className='flex'>
        <section className='px-10 py-3 w-[80%]'>
            <div className='flex flex-col gap-5'>
              <div className='flex justify-between text-lg py-3 px-5'>
                <p>Item information</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Size</p>
                <p></p>
              </div>
              <div className='flex flex-col gap-5 py-5 border-t border-b border-secondary'>
                <div className='flex items-center justify-between px-5'>
                  <div className='flex gap-4 items-center'>
                    <img src={ source } className='w-[200px] h-[200px]' />
                    <div className='flex flex-col text-lg gap-3'>
                      <p>Brand name</p>
                      <p className='text-base'>Item name</p>
                    </div>
                  </div>
                  <p>00.00 €</p>
                  <input type='number' min={1} max={100} className='max-w-[80px]' />
                  <select className='bg-secondary py-3 px-6 hover:bg-primary border-none'>
                    <option>S</option>
                    <option>M</option>
                  </select>
                  <div className='cursor-pointer'>
                    <AiOutlineMinusCircle size={25} />
                  </div>
                </div>
              </div>
              <button className='text-lg bg-secondary hover:bg-primary px-4 py-3'>Empty cart</button>
            </div>
        </section>
        <footer className='flex flex-col gap-4 w-[20%] p-5'>
          <p className='text-primary font-bold text-lg'>Summary</p>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <p>Discount:</p>
              <p>00.00 €</p>
            </div>
            <div className='flex justify-between'>
              <p>Total:</p>
              <p>00.00 €</p>
            </div>
          </div>
            <a href='/pages/cart/checkout' className='text-center text-lg bg-secondary hover:bg-primary px-4 py-3'>Go to Checkout</a>
        </footer>
      </section>
    </section>
  )
}
