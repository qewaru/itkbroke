"use client"
import React, { useState } from "react"
import { IoIosSearch } from 'react-icons/io'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

// TEMPORARY ARRAY - needs to be deleted after implementing commented code with fetching data from db below
const data = [
  {
    'A': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'B': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'C': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'D': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'E': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'F': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'G': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'H': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'I': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'J': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'K': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'L': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'M': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'N': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'O': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'P': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'Q': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'R': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'S': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'T': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'U': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'V': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'W': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'X': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'Y': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    'Z': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }],
    '0-9': [{ 'name': 'Name1', 'source': '/pages/brands/name' }, { 'name': 'Name2', 'source': '/pages/brands/name' }, { 'name': 'Name3', 'source': '/pages/brands/name' }]
  }
]

export default function Brands() {
  // TODO = COMMENTED SECTION - BRAND NAMES FETCHED FROM BACKEND/DB

  // const [data, setData] = useState([])

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('/api/users')
  //     const data = await response.json()
  //     setData(data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   }
  // }

  const [clicked, setClicked] = useState(null)

  const handleClick = (letter) => {
    setClicked(letter)
    console.log(letter)
  }

  return (
    <>
      <header className="flex flex-col items-center justify-center w-full">
        <div className="gap-8 w-auto text-xl font-bold py-10 hidden lg:flex">
          {data.map((item) => {
            return Object.entries(item).map(([letter, content]) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
            ))
          })}
        </div>

        <div className="gap-8 w-auto text-xl font-bold py-10 hidden lg:hidden semimd:flex ">
          <button><MdKeyboardArrowLeft size={25} /></button>
          {data[0] && Object.entries(data[0]).slice(0, 18).map(([letter, content]) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
          <button><MdKeyboardArrowRight size={25} /></button>
        </div>

        <div className="gap-8 w-auto text-xl font-bold py-10 hidden semimd:hidden md:flex">
          <button><MdKeyboardArrowLeft size={25} /></button>
          {data[0] && Object.entries(data[0]).slice(0, 10).map(([letter, content]) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
          <button><MdKeyboardArrowRight size={25} /></button>
        </div>

        <div className="gap-8 w-auto text-xl font-bold py-10 flex md:hidden">
          <button><MdKeyboardArrowLeft size={25} /></button>
          {data[0] && Object.entries(data[0]).slice(0, 5).map(([letter, content]) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
          ))}
          <button><MdKeyboardArrowRight size={25} /></button>
        </div>

        <div className="flex items-center w-[300px] h-[60px] sm:w-[400px] border-b border-secondary">
          <input className="w-full h-full pl-2" placeholder="Search for a brand"/>
          <button className="h-full">
            <IoIosSearch size={25} />
          </button>
        </div>
      </header>
      <section className="flex justify-center w-full h-full my-[70px]">
        <div className="w-auto grid grid-cols-2 gap-16 md:grid-cols-4 semimd:grid-cols-6">
        {data.map((item) => {
            return Object.entries(item).map(([letter, content]) => (
              <div key={letter} className={`flex flex-col p-2 hover:bg-secondary ${ clicked === letter ? 'bg-secondary' : '' }`}>
                <p className="text-xl font-bold">{letter}</p>
                <div className="flex flex-col pt-5">
                  {content.map((item, index) => (
                    <a className="hover:text-primary" href={item.source} key={index}>{item.name}</a>
                  ))}
                </div>
              </div>
            ))
          })}
        </div>
      </section>
    </>
  )
}