"use client"
import React, { useState, useEffect } from "react"
import Filter from './components/Filter'

const source = '/images/banners.png'

export default function Clothing() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('http://localhost:4000/api/getClothing', {
      method: 'GET',
    })
    const jsonResponse = await response.json()
    setData(jsonResponse)
  }

  const handleLink = (id) => {
    const array = data.find((item) => item._id === id)
    window.location.href = `/pages/clothing/${ array.shortName }`
  }

  return (
    <>
      <Filter />
      <section>
        <div className="flex justify-center w-full h-full py-[75px]">
          <div className="grid grid-cols-1 gap-16 lg:gap-24 lg:grid-cols-3 semimd:grid-cols-2">
            {data.map((item, index) => (
              <button key={index} onClick={() => handleLink(item._id)} className="flex flex-col items-center cursor-pointer">
                <img src={ item.files } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
                <div className="flex flex-col items-center py-5">
                  <p className="text-lg">{ item.brandName }</p>
                  <p>{ item.name }</p>
                  <p>{ item.price } €</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
