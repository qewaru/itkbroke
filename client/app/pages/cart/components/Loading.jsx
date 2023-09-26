import React from 'react'

export default function Loading() {
  return (
    <div className='relative overflow-hidden flex flex-col gap-5 bg-neutral-900 p-3 rounded-md shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:animate-[shimmer_1.25s_infinite]'>
        <div className='justify-between hidden sm:flex text-base sm:text-lg py-3 px-5'>
          <div className='w-[100px] h-[16px] bg-third rounded-lg' />
          <div className='w-[100px] h-[16px] bg-third rounded-lg' />
          <div className='w-[100px] h-[16px] bg-third rounded-lg' />
          <div />
        </div>
        <div className='flex flex-col gap-5 py-5 border-t-2 border-b-2 border-third'>
            <div className='flex items-center justify-between px-0 sm:px-5'>
              <div className='flex gap-4 items-center'>
                <div className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] bg-third rounded-lg' />
                <div className='flex flex-col text-lg gap-5'>
                  <div className='w-[120px] h-[16px] bg-third rounded-lg' />
                  <div className='w-[120px] h-[16px] bg-third rounded-lg' />
                </div>
              </div>
              <div className='flex flex-col sm:hidden gap-4 w-full h-full'>
                <div className='w-[80px] h-[16px] bg-third rounded-lg'></div>
                <div className='w-[80px] h-[16px] bg-third rounded-lg'></div>
              </div>
              <div className='hidden sm:block w-[200px] h-[16px] bg-third rounded-lg' />
              <div className='hidden sm:block w-[200px] h-[16px] bg-third rounded-lg' />
              <div className='cursor-pointer w-[30px] h-[30px] bg-third rounded-full'></div>
            </div>
            <div className='flex items-center justify-between px-0 sm:px-5'>
              <div className='flex gap-4 items-center'>
                <div className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] bg-third rounded-lg' />
                <div className='flex flex-col text-lg gap-5'>
                  <div className='w-[120px] h-[16px] bg-third rounded-lg' />
                  <div className='w-[120px] h-[16px] bg-third rounded-lg' />
                </div>
              </div>
              <div className='flex flex-col sm:hidden gap-4 w-full h-full'>
                <div className='w-[80px] h-[16px] bg-third rounded-lg'></div>
                <div className='w-[80px] h-[16px] bg-third rounded-lg'></div>
              </div>
              <div className='hidden sm:block w-[200px] h-[16px] bg-third rounded-lg' />
              <div className='hidden sm:block w-[200px] h-[16px] bg-third rounded-lg' />
              <div className='cursor-pointer w-[30px] h-[30px] bg-third rounded-full'></div>
            </div>
        </div>
        <div className='text-lg px-4 py-3 w-full h-[30px] bg-third'></div>
    </div> 
  )
}
