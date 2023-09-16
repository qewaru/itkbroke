import React from 'react'

export default function Empty() {
  return (
    <div className='flex flex-col items-center gap-2 py-3 text-center sm:text-start'>
      <p className='text-xl'>Cart is empty</p>
      <p>Check out <a href='/pages/clothing' className='underline hover:text-primary'>clothing</a> page and find something you like!</p>
    </div>
  )
}
