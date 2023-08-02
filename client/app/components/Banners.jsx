import React from 'react'
import Image from 'next/image'

export default function Banners() {
    const source = '/images/banners.png'

    return (
        <section className='flex justify-center w-full h-full py-10'>
            <div className='flex flex-col gap-24'>
                <div className='flex flex-row gap-24'>
                    <div className='w-[750px] h-[450px] bg-accent'>
                        <img src={ source } className='w-full h-full' />
                    </div>
                    <div className='w-[750px] h-[450px] bg-accent'>
                        <img src={ source } className='w-full h-full' />
                    </div>
                </div>
                <div className='flex flex-row gap-24'>
                    <div className='w-[750px] h-[450px] bg-accent'>
                        <img src={ source } className='w-full h-full' />
                    </div>
                    <div className='w-[750px] h-[450px] bg-accent'>
                        <img src={ source } className='w-full h-full' />
                    </div>
                </div>
            </div>
        </section>
    )
}
