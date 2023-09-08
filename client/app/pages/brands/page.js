"use client"
import React, { useState, useEffect } from "react"
import { IoIosSearch } from 'react-icons/io'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

export default function Brands() {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0-9']
  const [data, setData] = useState([])
  const [clicked, setClicked] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/api/brands', {
      method: 'GET',
    })
    const jsonResponse = await response.json()
    setData(jsonResponse)
  }

  const sortData = data.reduce((acc, item) => {
    const letter = item.name.charAt(0).toUpperCase()
    if (!acc[letter]) {
      acc[letter] = []
    }
    acc[letter].push(item)
    return acc
  }, {})

  const handleClick = (letter) => {
    setClicked(letter)
  }

  const handleLink = (id) => {
    const array = data.find((item) => item._id === id)
    window.location.href = `/pages/brands/${ array.shortName }`
  }

  return (
    <>
      <header className="flex flex-col items-center justify-center w-full">
        <div className="gap-8 w-auto text-xl font-bold py-10 hidden lg:flex">
          {letters.map((letter) => (
            <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
        </div>

        <div className="gap-8 w-auto text-xl font-bold py-10 hidden lg:hidden semimd:flex ">
          <button className="bg-transparent"><MdKeyboardArrowLeft size={25} /></button>
          {letters.slice(0, 18).map((letter) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
          <button className="bg-transparent"><MdKeyboardArrowRight size={25} /></button>
        </div>

        <div className="gap-8 w-auto text-xl font-bold py-10 hidden semimd:hidden md:flex">
          <button className="bg-transparent"><MdKeyboardArrowLeft size={25} /></button>
          {letters.slice(0, 10).map((letter) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
          <button className="bg-transparent"><MdKeyboardArrowRight size={25} /></button>
        </div>

        <div className="gap-8 w-auto text-xl font-bold py-10 flex md:hidden">
          <button className="bg-transparent"><MdKeyboardArrowLeft size={25} /></button>
          {letters.slice(0, 5).map((letter) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
          <button className="bg-transparent"><MdKeyboardArrowRight size={25} /></button>
        </div>

        <div className="flex items-center w-[300px] h-[60px] sm:w-[400px] border-b border-secondary">
          <input className="w-full h-full pl-2 border-none" placeholder="Search for a brand"/>
          <button className="h-full bg-transparent hover:bg-transparent">
            <IoIosSearch size={25} />
          </button>
        </div>
      </header>
      <section className="flex justify-center w-full h-full my-[70px]">
        <div className="w-auto grid grid-cols-2 gap-16 md:grid-cols-4 semimd:grid-cols-6">
          {letters.map((letter) => (
            <div key={letter} className={`flex flex-col p-2 hover:bg-secondary ${clicked === letter ? 'bg-secondary' : ''}`}>
                <p className="text-xl font-bold">{letter}</p>
                <div className="flex flex-col pt-5">
                    {sortData[letter]?.map((item, index) => (
                        <span onClick={ () => handleLink(item._id)} className="hover:text-primary cursor-pointer" key={index}>
                            {item.name}
                        </span>
                    ))}
                </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}