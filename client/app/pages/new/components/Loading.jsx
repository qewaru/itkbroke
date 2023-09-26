import React from 'react'

export default function Loading() {
  return (
    <>
      <div className='relative flex flex-col items-center overflow-hidden bg-neutral-900 p-3 rounded-md shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:animate-[shimmer_1.25s_infinite]'>
        <div className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] bg-third rounded-lg' />
        <div className='flex flex-col items-center gap-2 py-5 w-full'>
          <div className='h-[16px] w-[40%] bg-third rounded-lg'></div>
          <div className='h-[16px] w-[60%] bg-third rounded-lg'></div>
          <div className='h-[16px] w-[20%] bg-third rounded-lg'></div>
        </div>
      </div>
      <div className='relative flex flex-col items-center overflow-hidden bg-neutral-900 p-3 rounded-md shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:animate-[shimmer_1.25s_infinite]'>
        <div className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] bg-third rounded-lg' />
        <div className='flex flex-col items-center gap-2 py-5 w-full'>
          <div className='h-[16px] w-[40%] bg-third rounded-lg'></div>
          <div className='h-[16px] w-[60%] bg-third rounded-lg'></div>
          <div className='h-[16px] w-[20%] bg-third rounded-lg'></div>
        </div>
      </div>
      <div className='relative flex flex-col items-center overflow-hidden bg-neutral-900 p-3 rounded-md shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:animate-[shimmer_1.25s_infinite]'>
        <div className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] bg-third rounded-lg' />
        <div className='flex flex-col items-center gap-2 py-5 w-full'>
          <div className='h-[16px] w-[40%] bg-third rounded-lg'></div>
          <div className='h-[16px] w-[60%] bg-third rounded-lg'></div>
          <div className='h-[16px] w-[20%] bg-third rounded-lg'></div>
        </div>
      </div>
    </>
  )
}
