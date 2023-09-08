import React from 'react'
import BrandSection from './components/BrandSection'
import Items from './components/Items'

export default function BrandPanel() {
  return (
    <>
        <section className='relative flex flex-col gap-8 w-full'>
            <div className='bg-second border-2 hover:border-primary rounded-[30px] p-5'>
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
            <div className='bg-second border-2 hover:border-primary rounded-[30px] p-5'>
              <BrandSection />
            </div>
            <div className='bg-[#1a191a] border-2 hover:border-primary rounded-[30px] p-5'>
                <Items />
            </div>
            <div className='bg-second border-2 hover:border-primary rounded-[30px] p-5'>
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
            <div className='bg-second border-2 hover:border-primary rounded-[30px] p-5'>
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