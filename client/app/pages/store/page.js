import React from 'react'

export default function page() {
    const source = '/images/banners.png'
    const routes = [
        { name: 'New in', link: 'new' }, { name: 'Brands', link: 'brands' }, { name: 'Clothing', link: 'clothing' }, { name: 'Accessories', link: 'accessories' }, { name: 'Sales', link: 'sale' }
    ]
  return (
    <section className=' w-full h-full py-10 px-5 items-center'>
        <div className='flex flex-col gap-10'>
            {routes.map((route, index) => (
                <a key={index} href={`/pages/${route.link}`} className='relative w-full aspect-video bg-accent'>
                    <p className='text-accent [text-shadow:_0_1px_5px_rgb(0_0_0_/_40%)] text-2xl absolute top-[50%] left-[50%]  transform translate-x-[-50%] translate-y-[-50%]'>{route.name}</p>
                    <img src={source} className='w-full h-full aspect-video' />
                </a>
            ))}
        </div>
    </section>
  )
}
