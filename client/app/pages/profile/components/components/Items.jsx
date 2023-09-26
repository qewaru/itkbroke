"use client"
import React, { useState, useEffect } from 'react'
import { IoIosClose } from 'react-icons/io'

export default function Items() {
    const checkboxValues = [
        {id: 1, name: 'xs', value: 'XS'},
        {id: 2, name: 's', value: 'S'},
        {id: 3, name: 'm', value: 'M'},
        {id: 4, name: 'l', value: 'L'},
        {id: 5, name: 'xl', value: 'XL'},
        {id: 6, name: 'xxl', value: 'XXL'}
      ]
      
    const [toggle, setToggle] = useState(false)
    const [ edit, setEdit ] = useState('')
    const [ checkboxValue, setCheckboxValue ] = useState([])
    const [ itemList, setItemList ] = useState([])
    const [ item, setItem ] = useState({
      name: '',
      price: '',
      category: '',
      comments: '',
      status: 'In stock',
      sale: 'no'
    })
    
    const handleEdit = (id) => {
      const item = itemList.find(item => item._id === id)
      setEdit(item)
    }

    const handleToggle = () => {
      setToggle(!toggle)
    }
  
    const handleFile = async (e) => {
      const file = e.target.files[0]
      const base64 = await convertToBase64(file)
      setItem((prevData) => ({
        ...prevData,
        files: base64,
      }))
    }
  
    const handleInput = (event) => {
      const { name, value } = event.target
      setItem((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  
    const handleCheckbox = (event) => {
      const value = event.target.value
      if (event.target.checked) {
        setCheckboxValue([...checkboxValue, value ])
      } else {
        setCheckboxValue(checkboxValue.filter((item) => item !== value))
      }
    } 
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      const currentDate = new Date().toISOString().substring(0, 10)
      const itemData = {
        ...item,
        date: currentDate,
        sizes: checkboxValue
      }
  
      const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/newItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
        credentials: 'include'
      })
      const res = await response.text() 
      if (res === 'saved') {
        setToggle(false)
      }
    }

    // const handleEditItem = async () => {
    //   const response = await fetch('http://localhost:4000/api/updateItem', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(itemData),
    //     credentials: 'include'
    //   })
    // }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    const fetchData = async () => {
      const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/browseItems', {
        method: 'GET',
        credentials: 'include'
      })
      const jsonResponse = await response.json()
      setItemList(jsonResponse)
    }
  return (
    <section className='flex flex-col'>
        <p className='text-xl font-bold'>Items</p>
        <div className='flex flex-col gap-3 py-6 px-10'>
          <div className='flex justify-between'>
            <p className='text-lg font-bold text-center'>Your items</p>
            <button onClick={handleToggle} className='bg-primary hover:bg-second'>New item</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th className='hidden md:table-cell'>Price</th>
                <th className='hidden md:table-cell'>Total sales</th>
                <th className='hidden md:table-cell'>Release date</th>
                <th className='hidden md:table-cell'>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, index) => (
                <>
                  <tr key={index} className='hover:bg-secondary'>
                    <td><img src={item.files} className='w-[100px]'/></td>
                    <td className='text-accent'>
                      <a href={`/pages/clothing/${item.shortName}`}>{item.name}</a>
                    </td>
                    <td className='hidden md:table-cell'>{item.price}</td>
                    <td className='hidden md:table-cell'>-</td>
                    <td className='hidden md:table-cell'>{item.date}</td>
                    <td className='hidden md:table-cell'>{item.status}</td>
                    <td className='text-center'>
                      <button className='bg-transparent border-2 border-primary' onClick={() => handleEdit(item._id)}>Edit</button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        {toggle && 
          <form onSubmit={ handleSubmit } className='flex justify-center'>
            <div className='relative flex flex-col items-center gap-3 border-2 rounded-xl p-3 border-slate bg-second'>
            <IoIosClose size={30} className='absolute z-10 right-0 top-0 cursor-pointer' onClick={handleToggle} />
            <p className='text-lg font-bold'>Add item</p>
            <div className='flex flex-col gap-3'>
              <div className='flex flex-col gap-2'>
                <p className='font-bold text-center'>Info</p>
                <input name='name' type='text' placeholder='Item name' onChange={ handleInput } />
                <input name='price' type='text' placeholder='Price' onChange={ handleInput } />
                <input name='category' type='text' placeholder='Category' onChange={ handleInput } />
                <input name='files' type='file' accept="image/png, image/jpeg, image/jpg" className='border-none p-0 my-2' onChange={ (e) => handleFile(e) } />
              </div>
              <div className='flex flex-col gap-3 items-center'>
                <p className='font-bold'>Sizes</p>
                <div className='flex gap-2 '>
                  {checkboxValues.map((checkbox) => (
                    <div key={checkbox.id} className='flex gap-1'>
                      <input type='checkbox' value={checkbox.value} onChange={handleCheckbox} />
                      <p>{checkbox.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex flex-col gap-3 items-center'>
                <p className='font-bold'>Comments</p>
                <input type='text' name='comments' />
              </div>
            </div>
            <button type='submit' className='bg-primary/50 hover:bg-primary'>Create new item</button>
            </div>
          </form>
        }
        {edit !== '' ?
          <form  className='relative flex flex-col px-10'>
            <IoIosClose size={30} className='absolute z-10 right-0 top-0 cursor-pointer' onClick={() => handleEdit('')} />
            <p className='text-lg font-bold'>Edit item</p>
            <div className='flex justify-between'>
              <div className='flex flex-col items-center'>
                <p>Current item</p>
                <div className='flex flex-col gap-2 items-center'>
                  <img src={edit.files} className='w-[100px]'/>
                  <p>{edit.name}</p>
                  <p>{edit.price}</p>
                  <p>{edit.status}</p>
                  <div className='flex gap-1'>
                    <p>Comments: </p>
                    <p>{edit.comments}</p>
                  </div>
                  <div className='flex gap-1'>
                    <p>Sizes: </p>
                    {edit.sizes.map(size => (<p key={size}>{size}</p>))}
                  </div>
                  <div className='flex gap-1'>
                    <p>Sale status: </p>
                    <p>{edit.sale === 'no' ? 'Not on sale' : 'Currently on sale'}</p>
                  </div>
                </div>
              </div>
              <div>
                <p>Edited item</p>
                <div className='flex flex-col gap-3'>
                  <div>
                    <p>Update image</p>
                    <input type='file'/>
                  </div>
                  <div>
                    <p>Update name</p>
                    <input type='text'/>
                  </div>
                  <div>
                    <p>Update price</p>
                    <input type='text'/>
                  </div>
                  <div>
                    <p>Update stock status</p>
                    <select className='bg-secondary p-3'>
                      <option value='stock'>In stock</option>
                      <option value='unavailable'>Currently unavailable</option>
                    </select>
                  </div>
                  <div>
                    <p>Update sizes</p>
                    <div className='flex gap-3'>
                      {checkboxValues.map((checkbox) => (
                        <div key={checkbox.id} className='flex gap-1'>
                          {/* <input type='checkbox' value={checkbox.value} onChange={handleCheckbox} /> */}
                          <input type='checkbox' value={checkbox.value}/>
                          <p>{checkbox.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p>Update sale status</p>
                    <select className='bg-secondary p-3'>
                      <option value='stock'>Put on sale</option>
                      <option value='unavailable'>Remove from sale</option>
                    </select>
                  </div>
                  <button type='submit'>Update</button>
                </div>
                
              </div>
            </div>
          </form>
        :        
          <></>
        }
    </section>
  )
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}
