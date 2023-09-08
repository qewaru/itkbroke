"use client"
import React, { useState, useEffect } from 'react'
import Delivery from '../components/Delivery'
import Review from '../components/Review'

export default function page() {
  const [data, setData] = useState(null)
  const [showReview, setShowReview] = useState(false);

  const handleForm = (data) => {
    setData(data)
    setShowReview(true)
  }

  return (
    <section>
        <header className='flex justify-center py-10'>
            <div className='px-7 py-2 border-b-4 border-b-primary'>
              <p className={!showReview ? 'font-bold' : ''}>1. Delivery</p>
            </div>
            <div className={showReview ? 'px-7 py-2 border-b-4 border-b-primary' : 'px-7 py-2 border-b-4 border-b-secondary'}>
              <p className={showReview ? 'font-bold' : ''}>2. Order review</p>
            </div>
            <div className='px-7 py-2 border-b-4 border-b-secondary'>
              <p className=''>3. Payment</p>
            </div>
        </header>
        <section className='flex flex-col items-center gap-5'>
          {!showReview && <Delivery onDataSubmit={handleForm} />}
          {showReview && <Review userData={data} />}
        </section>
    </section>
  )
}
