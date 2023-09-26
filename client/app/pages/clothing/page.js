"use client"
import React, { useState, useEffect } from "react"
import Filter from './components/Filter'
import Loading from "./components/Loading"

export default function Clothing() {
  const [data, setData] = useState([])
  const [prices, setPrices] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getClothing', {
      method: 'GET',
    })
    const jsonResponse = await response.json()
    setData(jsonResponse)
  }

  useEffect(() => {
    let prices = []
    data.map((item) => {
      const itemPrice = parseFloat(item.price)
      prices.push(itemPrice)
    })
    const min = Math.min.apply(Math, prices)
    const max = Math.max.apply(Math, prices)
    prices = [min, max]
    setPrices(prices)
  }, [data])

  const handleLink = (id) => {
    const array = data.find((item) => item._id === id)
    window.location.href = `/pages/clothing/${ array.shortName }`
  }

  return (
    <>
      <Filter data={prices} />
      <section>
        <div className="flex justify-center w-full h-full py-[75px]">
          <div className="grid grid-cols-1 gap-16 lg:gap-24 lg:grid-cols-3 semimd:grid-cols-2">
            {data.length === 0
            ? <Loading />
            :
            data.map((item, index) => (
              <nav key={index} onClick={() => handleLink(item._id)} className="flex flex-col items-center cursor-pointer">
                <img src={ item.files } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
                <div className="flex flex-col items-center py-5">
                  <p className="text-lg">{ item.brandName }</p>
                  <p>{ item.name }</p>
                  <p>{ item.price } €</p>
                </div>
              </nav>
            ))
            }
          </div>
        </div>
      </section>
    </>
  )
}
