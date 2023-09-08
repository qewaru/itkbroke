"use client"
import React, {useState} from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

export default function BrandSection() {
    const source = '/images/banners.png'
    const [ edit, setEdit ] = useState('')

    const handleEdit = (type) => {
        setEdit(type)
      }
  return (
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
                          <button onClick={() => handleEdit('brand-img')} className='bg-second hover:bg-second py-0 hover:font-bold'>Edit</button>
                        </>
                      ) : (
                        <>
                          <input name='brand-files' type='file' accept="image/png, image/jpeg, image/jpg" placeholder='Item name' className='border-none p-0 my-2' />
                          <div className='flex gap-5 mt-2'>
                            <button className='bg-primary hover:bg-accent px-4 py-3'>Update</button>
                            <button className='bg-secondary px-4 py-3' onClick={() => handleEdit('')}>Cancel</button>
                          </div>
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
                        <div className='flex gap-5 mt-2'>
                          <button className='bg-primary hover:bg-accent px-4 py-3'>Update</button>
                          <button className='bg-secondary px-4 py-3' onClick={() => handleEdit('')}>Cancel</button>
                        </div>
                      </>
                    )}
                    </div>
                    
                    <div className='flex flex-col gap-1 py-2 items-center'>
                    {edit !== 'brand-description' ? (
                      <>
                        <div className='flex flex-row gap-2 items-center'>
                          <p className='font-bold'>Description</p>
                          <AiOutlineEdit size={20} onClick={() => handleEdit('brand-description')} />
                        </div>
                      </>
                     ) : (
                       <>
                        <input name='brand-description' type='text' placeholder='Description' />
                        <div className='flex gap-5 mt-2'>
                          <button className='bg-primary hover:bg-accent px-4 py-3'>Update</button>
                          <button className='bg-secondary px-4 py-3' onClick={() => handleEdit('')}>Cancel</button>
                        </div>
                       </>
                     )}
                   </div>
                      
                   <div className='flex flex-col gap-1 py-2 items-center'>
                     {edit !== 'brand-category' ? (
                       <>
                        <div className='flex flex-row gap-2 items-center'>
                          <p className='font-bold'>Category</p>
                          <AiOutlineEdit size={20} onClick={() => handleEdit('brand-category')} />
                        </div>
                       </>
                     ) : (
                       <>
                        <input name='brand-category' type='text' placeholder='Category' />
                        <div className='flex gap-5 mt-2'>
                          <button className='bg-primary hover:bg-accent px-4 py-3'>Update</button>
                          <button className='bg-secondary px-4 py-3' onClick={() => handleEdit('')}>Cancel</button>
                        </div>
                       </>
                     )}
                   </div>
                  </div>
                </div>
              </section>
  )
}
