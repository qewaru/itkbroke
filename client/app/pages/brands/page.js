"use client"
import React, { useState } from "react"
import { IoIosSearch } from 'react-icons/io'

// TEMPORARY ARRAY - needs to be deleted after implementing commented code with fetching data from db below
const data = [
  {
    'A': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'C': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'B': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'D': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'E': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'F': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'G': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'H': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'I': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'J': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'K': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'L': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'M': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'N': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'O': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'P': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'Q': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'R': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'S': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'T': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'U': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'V': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'W': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'X': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'Y': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    'Z': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }],
    '0-9': [{ 'name': 'Name1', 'source': '/source1' }, { 'name': 'Name2', 'source': '/source2' }, { 'name': 'Name3', 'source': '/source3' }]
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
        <div className="flex gap-8 text-xl font-bold py-10">
          {data.map((item) => {
            return Object.entries(item).map(([letter, content]) => (
              <div onClick={() => handleClick(letter) } className="cursor-pointer hover:text-primary" key={ letter }>{ letter }</div>
            ))
          })}
        </div>
        <div className="flex items-center w-[400px] h-[60px] border-b border-secondary">
          <input className="w-full h-full pl-2" placeholder="Search for a brand"/>
          <button className="h-full">
            <IoIosSearch size={25} />
          </button>
        </div>
      </header>
      <section className="flex justify-center w-full h-full my-[70px]">
        <div className="w-auto grid grid-cols-4 gap-16 semimd:grid-cols-6">
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