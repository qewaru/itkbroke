import React from 'react'

export default function Review({userData}) {
  return (
    <>
        <p className='text-lg'>Check your information before payment</p>
        <form className='flex flex-col gap-2 items-center'>
            <p>{userData.fname} {userData.sname}, {userData.email}</p>
            <p>{userData.country}, {userData.city}, {userData.address}, {userData.zipcode}</p>
            <button type='submit' className='underline'>Edit</button>
            <button className='bg-secondary hover:bg-primary px-4 py-3 my-3 min-w-[250px]'>Continue</button>
        </form>
    </>
  )
}
