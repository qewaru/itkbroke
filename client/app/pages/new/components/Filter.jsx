"use client"
import React, { useState } from 'react'
import { BiFilterAlt } from 'react-icons/bi'
import { MdOutlineKeyboardArrowDown,  MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { IoIosClose } from 'react-icons/io'

const buttons = ['Headwear', 'Jewellery', 'Hoodies', 'Pants', 'T-Shirts', 'Jackets']
const category = ['Headwear', 'Jewellery', 'Denim', 'Hoodies', 'Jackets', 'Pants', 'Polo Shirts', 'Sweatshirts', 'T-Shirts']
const size = ['XS', 'S', 'M', 'L', 'XL', 'XL+']
const colors = ['Black', 'Blue', 'Brown', 'Gold', 'Green', 'Grey', 'Navy', 'Multi', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'White', 'Yellow', ]

export default function Filter(prices) {
  const [toggle, setToggle] = useState(false)
  const [open, setOpen] = useState({  })
  const [ value1, setValue1 ] = useState(prices.data[0])
  const [ value2, setValue2 ] = useState(prices.data[0])

  const handleRange1 = (event) => {
      const value = parseInt(event.target.value)
      setValue1(value)       
      if (value > value2) {
        setValue2(value)
      }
    }

  const handleRange2 = (event) => {
      const value = parseInt(event.target.value)
      setValue2(value)       
      if (value < value1) {
        setValue1(value)
      }
  }
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleOpen = (openId) => {
    setOpen((prevVisability) => ({
        ...prevVisability,
        [openId]: !prevVisability[openId],
    }))
  }

  return (
    <header className="flex justify-center w-full h-[auto] pt-[45px] text-lg">
        <div className="flex justify-between w-[80%] gap-3 flex-col sm:flex-row">
          <div className="flex gap-5">
            <button onClick={ handleToggle } className="bg-secondary py-3 px-6 peer hover:bg-primary flex items-center gap-2">
              <BiFilterAlt size={20} /> All filters
            </button>
            <div className="hidden gap-5 lg:flex">
              {buttons.map((item, index) => (
                <button key={index} className="bg-secondary py-3 px-6 hover:bg-primary">{item}</button>
              ))}
            </div>
          </div>
          
          <div className='flex flex-col'>
            {/* <div>
              <button className="bg-secondary py-3 px-6 hover:bg-primary flex items-center justify-between min-w-[150px]">
                Sort by
                <MdOutlineKeyboardArrowDown size={20} />
              </button>
            </div>
             <div className='flex flex-col bg-secondary w-full'>
                <button className='w-full hover:bg-primary py-2'>Default</button>
                <button className='w-full hover:bg-primary py-2'>Low to high</button>
                <button className='w-full hover:bg-primary py-2'>High to low</button>
                <button className='w-full hover:bg-primary py-2'>Newest</button>
            </div> */}
          </div>
        </div>

        <div className={`z-20 top-0 left-0 w-full h-screen bg-black/50 ${toggle ? 'fixed' : 'hidden'}`}></div>
        <aside className={`z-20 top-0 left-0 fixed flex flex-col justify-between p-6 bg-background w-[100%] h-full lg:w-[30%] semimd:w-[40%] md:w-[50%] transition duration-300 ease-in-out ${toggle ? 'translate-x-0' : 'translate-x-[-100%]'}`}>
            <header className='flex justify-between pb-5 pt-0'>
                <p className='text-lg font-bold'>All Filters</p>
                <div onClick={ handleToggle } className='flex justify-end cursor-pointer'>
                    <IoIosClose size={35} />
                </div>
            </header>
            <section className='flex flex-col gap-7 h-full pt-5 px-4 overflow-y-auto'>
                <div className='w-full'>
                    <div onClick={() => handleOpen('category')} className='flex justify-between w-full py-3 cursor-pointer hover:bg-[#060406]'>
                        <p>Category</p>
                        {!open['category'] && <MdOutlineKeyboardArrowDown size={30}/>}
                        {open['category'] && <MdOutlineKeyboardArrowUp size={30}/>}
                    </div>
                    {open['category'] &&
                        <div className='flex flex-col gap-2 w-full px-2 py-3'>
                            {category.map((item, index) => (
                                <div key={index} className='flex justify-between'>
                                    <p>{ item }</p>
                                    <input type='checkbox' />
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className='w-full'>
                    <div onClick={() => handleOpen('size')} className='flex justify-between w-full py-3 cursor-pointer hover:bg-[#060406]'>
                        <p>Size</p>
                        {!open['size'] && <MdOutlineKeyboardArrowDown size={30}/>}
                        {open['size'] && <MdOutlineKeyboardArrowUp size={30}/>}
                    </div>
                    {open['size'] && 
                        <div className='flex flex-col gap-2 w-full px-2 py-3'>
                            {size.map((item, index) => (
                                <div key={index} className='flex justify-between'>
                                    <p>{ item }</p>
                                    <input type='checkbox' />
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className='w-full'>
                    <div onClick={() => handleOpen('color')} className='flex justify-between w-full py-3 cursor-pointer hover:bg-[#060406]'>
                        <p>Color</p>
                        {!open['color'] && <MdOutlineKeyboardArrowDown size={30}/>}
                        {open['color'] && <MdOutlineKeyboardArrowUp size={30}/>}
                    </div>
                    {open['color'] && 
                        <div className='flex flex-col gap-2 w-full px-2 py-3'>
                            {colors.map((item, index) => (
                                <div key={index} className='flex justify-between'>
                                    <p>{ item }</p>
                                    <input type='checkbox' />
                                </div>
                            ))}
                        </div>
                    }
                </div>
                <div className='w-full'>
                    <div onClick={() => handleOpen('price')} className='flex justify-between w-full py-3 cursor-pointer hover:bg-[#060406]'>
                        <p>Price</p>
                        {!open['price'] && <MdOutlineKeyboardArrowDown size={30}/>}
                        {open['price'] && <MdOutlineKeyboardArrowUp size={30}/>}
                    </div>
                    {open['price'] && 
                        <div className='flex flex-col gap-2 w-full px-2 py-3'>
                            <div className='flex justify-between py-3'>
                                {/* <input className='flex text-center w-[50px]' value={value1 || prices.data[0]}/>
                                <input className='flex text-center w-[50px]' value={value2 || prices.data[1]}/> */}
                                <p>{value1 || prices.data[0]}</p>
                                <p>{value2 || prices.data[1]}</p>
                            </div>
                            <div className='relative'>
                                <input type='range' step={10} min={prices.data[0]} max={prices.data[1]} value={value1} onChange={handleRange1} />
                                <input type='range' step={10} min={prices.data[0]} max={prices.data[1]} value={value2} onChange={handleRange2} />
                            </div>
                        </div>
                    }
                </div>
            </section>
            <footer className='flex justify-center'>
                <button className='bg-secondary hover:bg-primary px-4 py-3'>Apply Filters</button>
            </footer>
        </aside>
      </header>
  )
}
