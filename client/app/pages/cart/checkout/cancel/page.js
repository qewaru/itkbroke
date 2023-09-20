import React from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function page() {
  return (
    <section className='flex flex-col items-center h-screen'>
        <header className='flex items-center gap-3 py-10'>
        <AiFillCloseCircle size={50} fill='#EB3434'/>
        </header>
        <section className='pb-4'>
            <p className='text-xl sm:text-2xl text-center'>Payment was unsuccessful</p>
        </section>
        <footer className='flex flex-col items-center gap-10'>
            <div className='flex flex-col items-center gap-2'>
                <p className='text-base sm:text-lg text-center'>Something went wrong during payment proccess</p>
                <p className='text-sm sm:text-base text-center'>If you have any issues, feel free to contact us.</p>
            </div>
            <a href='/pages/cart' className='text-lg bg-secondary hover:bg-primary px-4 py-3 rounded-xl'>Get back to cart</a>
        </footer>
    </section>
  )
}
