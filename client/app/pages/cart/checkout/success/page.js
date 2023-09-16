import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'

export default function page() {
  return (
    <section className='flex flex-col items-center h-screen'>
        <header className='flex items-center gap-3 py-10'>
        <AiFillCheckCircle size={50} fill='#34eb4c'/>
        </header>
        <section className='pb-4'>
            <p className='text-2xl'>Payment succeeded</p>
        </section>
        <footer className='flex flex-col items-center gap-2'>
            <p className='text-lg'>Thank you for your order!</p>
            <div className='flex flex-col items-center'>
                <p>Keep on track with your order on your email.</p>
                <p>If you have any questions, feel free to contact us.</p>
            </div>
        </footer>
    </section>
  )
}
