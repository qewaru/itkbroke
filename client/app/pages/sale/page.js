"use client"
import React, { useState, useEffect } from "react"
import Filter from './components/Filter'
import Loading from "./components/Loading"

const source = '/images/banners.png'

export default function Sale() {
  const [ data, setData ] = useState([])
  const [ prices, setPrices ] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getSales', {
      method: 'GET'
    })
    const json = await response.json()
    setData(json)
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
      <Filter data={ prices } />
      <section>
        <div className="flex justify-center w-full h-full py-[75px]">
          <div className="grid grid-cols-1 gap-16 lg:gap-24 lg:grid-cols-3 semimd:grid-cols-2">
          {data.length === 0
            ? <Loading />
            :
            data.map((item, index) => (
              <nav key={index} onClick={() => handleLink(item._id)} className="flex flex-col items-center cursor-pointer">
                <div className="absolute flex justify-center items-center w-[50px] h-[25px] text-sm bg-primary">
                  <p>- {item.salePercent}%</p>
                </div>
                <img src={ item.files } className='w-[250px] h-[250px] lg:w-[300px] lg:h-[300px]' />
                <div className="flex flex-col items-center py-5">
                  <p className="text-lg">{ item.brandName }</p>
                  <p>{ item.name }</p>
                  <div className="flex gap-4">
                    <p className="text-accent">{ item.salePrice } €</p>
                    <p className="text-white/50 line-through">{ item.price } €</p>
                  </div>
                </div>
              </nav>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
