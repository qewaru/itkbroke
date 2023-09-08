import React from 'react'

export default function Banners() {
    const source = '/images/banners.png'

    return (
        <section className='flex justify-center w-full h-full py-10'>
            <div className='flex flex-wrap gap-24 w-full justify-center'>
                <div className='w-full aspect-video mx-14 semimd:mx-0 md:mx-32 semimd:w-[750px] semimd:h-[450px] bg-accent'>
                    <img src={ source } className='w-full h-full' />
                </div>
                <div className='w-full aspect-video mx-14 semimd:mx-0 md:mx-32 semimd:w-[750px] semimd:h-[450px] bg-accent'>
                    <img src={ source } className='w-full h-full' />
                </div>
                <div className='w-full aspect-video mx-14 semimd:mx-0 md:mx-32 semimd:w-[750px] semimd:h-[450px] bg-accent'>
                    <img src={ source } className='w-full h-full' />
                </div>
                <div className='w-full aspect-video mx-14 semimd:mx-0 md:mx-32 semimd:w-[750px] semimd:h-[450px] bg-accent'>
                    <img src={ source } className='w-full h-full' />
                </div>
            </div>
        </section>
    )
}
