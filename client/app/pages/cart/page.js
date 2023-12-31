"use client"
import React, { useState, useEffect } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import secureLocalStorage from 'react-secure-storage'
import Empty from './components/Empty'
import Loading from './components/Loading'

export default function Cart() {
  const [ data, setData ] = useState([])
  const [ cartItems, setCartItems ] = useState([])
  const [ items, setItems ] = useState([])
  const [ total, setTotal ] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storageItems = secureLocalStorage.getItem('cart')
    setCartItems(storageItems)    
    fetchData(storageItems)
  }, [])

  const fetchData = async (items) => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/getCartItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items)
    })
    const json = await response.json()
    setData(json)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(cartItems)
    if (cartItems.length > 0 && data.length > 0) {
      const updatedItems = cartItems.map((item1, index) => {
        const matching = data.find((item2) => item2._id === item1.id)
  
        return {
          index: index,
          id: matching._id,
          name: matching.name,
          brandName: matching.brandName,
          files: matching.files,
          price: matching.price,
          email: matching.email,
          size: item1.size,
        }
      })
      setItems(updatedItems)
    }
  }, [cartItems, data])

  useEffect(() => {
    if (items && items.length > 0) {
      const totalPrice = items.reduce((total, item) => {
        const itemPrice = parseFloat(item.price)
        return total + itemPrice
      }, 0);
      setTotal(totalPrice)
    } else {
      setTotal('00.00')
    }
  }, [items])

  const onRemoveItem = (itemRemoveIndex, itemRemoveSize) => {
    setItems((prevItems) => prevItems.filter((item) => item.index !== itemRemoveIndex))
    setCartItems((prevItems) => prevItems.filter((item) => item.size !== itemRemoveSize))
  }

  const emptyCart = () => {
    setItems(null)
    setCartItems([])
  }

  useEffect(() => {
    secureLocalStorage.setItem('cart', cartItems)
  })
  
  return (
    <section className='py-10 px-5 sm:px-14 h-screen'>
      <header>
        <p className='text-xl font-bold text-primary'>Shopping cart</p>
      </header>
      <section className='flex flex-col sm:flex-row items-center sm:items-start'>
        <section className='px-5 sm:px-10 py-3 w-full sm:w-[80%] border-b border-b-second sm:border-none'>
          {isLoading ? (
            < Loading/>
          ) : data.length === 0 && items.length === 0 ? (
            <Empty />
          ) : (
            <div className='flex flex-col gap-5'>
              <div className='justify-between hidden sm:flex text-base sm:text-lg py-3 px-5'>
                <p>Item information</p>
                <p></p>
                <p>Price</p>
                {/* <p>Quantity</p> */}
                <p>Size</p>
                <p></p>
              </div>
              <div className='flex flex-col gap-5 py-5 border-t border-b border-secondary'>
                {items.map((item) => (
                  <div key={item.index} className='flex items-center justify-between px-0 sm:px-5'>
                    <div className='flex gap-4 items-center'>
                      <img src={ item.files } className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]' />
                      <div className='flex flex-col text-lg gap-3'>
                        <p>{item.brandName}</p>
                        <p className='text-base'>{item.name}</p>
                      </div>
                    </div>
                    <div className='flex flex-col sm:hidden gap-4'>
                      <p>{item.price} €</p>
                      {/* <input type='number' min={1} max={100} className='max-w-[80px]' /> */}
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='hidden sm:block'>{item.price} €</p>
                    {/* <input type='number' min={1} max={100} className='max-w-[80px]' /> */}
                    <p className='hidden sm:block'>{item.size}</p>
                    <div onClick={ () => onRemoveItem(item.index, item.size)} className='cursor-pointer'>
                      <AiOutlineMinusCircle size={25} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={emptyCart} className='text-lg bg-secondary hover:bg-primary px-4 py-3'>Empty cart</button>
            </div>
          )}
        </section>
        <footer className='flex flex-col gap-4 w-full semimd:w-[20%] p-5'>
          <p className='text-primary font-bold text-lg'>Summary</p>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <p>Discount:</p>
              <p>00.00 €</p>
            </div>
            <div className='flex justify-between'>
              <p>Total:</p>
              <p>{total} €</p>
            </div>
          </div>
          <a href='/pages/cart/checkout' className='text-center text-lg bg-secondary hover:bg-primary px-4 py-3'>Go to Checkout</a>
        </footer>
      </section>
    </section>
  )
}
