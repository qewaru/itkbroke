"use client"
import React, { useState, useEffect } from 'react'
const source = '/images/banners.png'
import { AiOutlineEdit } from 'react-icons/ai'

export default function BrandPanel() {
  const [ edit, setEdit ] = useState('')

  const handleEdit = (type) => {
    setEdit(type)
  }

  return (
    <>
        <section className='flex flex-col gap-8 w-full'>
            <div className='bg-second border border-primary rounded-[30px] p-5'>
              <section className='flex flex-col'>
                <p className='text-xl font-bold'>Overview</p>
                <div>
                  <p className='text-lg font-bold'>Sales</p>
                  <div className='flex gap-10'>
                    <div className='flex flex-col items-center'>
                      <p>Total income</p>
                      <p>00.00</p>
                    </div>
                    <div className='flex flex-col items-center'>
                      <p>This month</p>
                      <p>00.00</p>
                    </div>
                  </div>
                </div>
                <p>account's activity, including sales, earnings, pending transactions, and recently uploaded items</p>
              </section>
            </div>
            <div className='bg-second border border-primary rounded-[30px] p-5'>
              <section className='flex flex-col'>
                <p className='text-xl font-bold'>Brand section</p>
                <div className='flex flex-col items-center'>
                  <p className='text-lg font-bold'>Information</p>
                  <div className='flex flex-col items-center gap-2'>
                    
                    <div className='flex flex-col gap-2 items-center'>
                      {edit !== 'brand-img' ? (
                        <>
                          <p className='font-bold'>Image</p>
                          <img src={ source } className='w-[150px] h-[150px]' />
                          <button onClick={() => handleEdit('brand-img')}>Edit</button>
                        </>
                      ) : (
                        <>
                          <input name='brand-files' type='file' accept="image/png, image/jpeg, image/jpg" placeholder='Item name' className='border-none p-0 my-2' />
                          <button className='bg-primary px-4 py-3'>Update</button>
                        </>
                      )}
                    </div>

                    <div className='flex flex-col gap-1 py-2 items-center'>
                    {edit !== 'brand-name' ? (
                      <>
                        <div className='flex flex-row gap-2 items-center'>
                          <p className='font-bold'>Brand name</p>
                          <AiOutlineEdit size={20} onClick={() => handleEdit('brand-name')} />
                        </div>
                        <p>asdasdas</p>
                      </>
                    ) : (
                      <>
                        <input name='brand-name' type='text' placeholder='Item name' />
                        <button className='bg-primary px-4 py-3'>Update</button>
                      </>
                    )}
                    </div>
                    
                    <div className='flex gap-2 items-center'>
                    {edit !== 'brand-description' ? (
                      <>
                        <p className='font-bold'>Description</p>
                        <AiOutlineEdit size={20} onClick={() => handleEdit('brand-description')} />
                      </>
                     ) : (
                       <>
                        <input name='brand-description' type='text' placeholder='Description' />
                        <button className='bg-primary px-4 py-3'>Update</button>
                       </>
                     )}
                   </div>
                      
                   <div className='flex gap-2 items-center'>
                     {edit !== 'brand-category' ? (
                       <>
                         <p className='font-bold'>Category</p>
                         <AiOutlineEdit size={20} onClick={() => handleEdit('brand-category')} />
                       </>
                     ) : (
                       <>
                        <input name='brand-category' type='text' placeholder='Category' />
                        <button className='bg-primary px-4 py-3'>Update</button>
                       </>
                     )}
                   </div>
                  </div>
                </div>
              </section>
            </div>
            <div className='bg-second border border-primary rounded-[30px] p-5'>
                <section className='flex flex-col'>
                    <p className='text-xl font-bold'>Items</p>
                    <div className='flex flex-col gap-3 py-6'>
                      <p className='text-lg font-bold text-center'>Your items</p>
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Total sales</th>
                            <th>Release date</th>
                            <th>///</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>sdfds</td>
                            <td>sdfds</td>
                            <td>sdfds</td>
                            <td>sdfds</td>
                            <td>sdfds</td>
                            <td>
                              <button>Edit</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                      <p className='text-lg font-bold'>Add item</p>
                      <div className='flex flex-col gap-3'>
                        <input name='name' type='text' placeholder='Item name' />
                        <input name='price' type='text' placeholder='Price' />
                        <input name='category' type='text' placeholder='Category' />
                        <input name='files' type='file' accept="image/png, image/jpeg, image/jpg" className='border-none p-0 my-2' />
                      </div>
                      <button className='bg-primary/50 hover:bg-primary px-4 py-3'>Create new item</button>
                    </div>
                </section>
            </div>
            <div className='bg-second border border-primary rounded-[30px] p-5'>
              <section>
                <p className='text-xl font-bold'>Payments</p>
                <div>
                  <p className='text-lg font-bold'>Billing</p>
                  <p>card information form</p>
                </div>
                <div>
                  <p className='text-lg font-bold'>Subscription</p>
                  <p>view plans</p>
                </div>
              </section>
            </div>
            <div className='bg-second border border-primary rounded-[30px] p-5'>
              <section>
                <p className='text-xl font-bold'>Support</p>
                <div>
                  <p>FAQ</p>
                </div>
                <div>
                  <p>Email support</p>
                </div>
              </section>
            </div>
        </section>
    </>
  )
}
