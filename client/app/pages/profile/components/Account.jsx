"use client"
import React, { useState, useEffect } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

export default function Account() {
  const [ data, setData ] = useState([])
  const [ checked, setChecked ] = useState(false)
  const [toggle, setToggle] = useState({
    newsletter: true,
    following: false
  })

  // const notifications = [
  //   {value: 'all', text: 'Turn on/off all notifications'}, 
  //   {value: 'newsletter', text: 'Newsletter'}, 
  //   {value: 'following', text: 'Following brands'}
  // ]

  const notifications = [
    {value: 'newsletter', text: 'Newsletter'}, 
    {value: 'following', text: 'Following brands'}
  ]
  
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/userInfo', {
      method: 'GET',
      credentials: 'include'
    })
    const jsonResponse = await response.json()
    setData(jsonResponse)
    setToggle(jsonResponse.notifications)
  }

  const handleChecked = () => {
    setChecked(!checked)
  }

  const handleSwitch = (value) => {
    setToggle((prevState) => ({
      ...prevState,
      [value]: !prevState[value]
    }))
  }

  const saveNotifs = async () => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/api/setNotifs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(toggle)
    })
    if (response.status === 200) {
      console.log('ok')
    }
  }

  const handleDelete = async () => {
    const response = await fetch('https://onec14ee0a51ca570b56ce05a2ff17ab11.onrender.com/deleteAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })

    const res = await response.text()
    console.log(res)
    if (res === 'deleted') {
      localStorage.setItem('hasLoggedIn', 'false')
      window.location.reload()
    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-center gap-10 md:gap-36 py-10 px-5 md:px-0'>
      <div className='flex flex-col'>
        <div className='flex text-xl gap-3 items-center'>
          <p>{data.name1} {data.name2}</p>
          <div className='cursor-pointer'>
            <AiOutlineEdit size={20} />
          </div>
        </div>
        <div className='flex flex-col text-xl my-5'>
          <p>Email</p>
          <div className='flex text-lg gap-3 items-center'>
            <p>{data.email}</p>
            <div className='cursor-pointer'>
              <AiOutlineEdit size={20} />
            </div>
          </div>
        </div>
        <form className='flex flex-col gap-3 text-xl'>
          <p>Change password</p>
          <div className='text-lg'>
            <p>Old password</p>
            <input placeholder='Type here...' />
          </div>
          <div className='text-lg'>
            <p>New password</p>
            <input placeholder='Type here...' />
          </div>
          <div className='text-lg'>
            <p>Confirm new password</p>
            <input placeholder='Type here...' />
          </div>
          <div className='flex justify-center my-2'>
            <button className='text-lg bg-secondary hover:bg-primary px-4 py-3'>Update password</button>
          </div>
        </form>
      </div>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-3'>
          <p className='text-xl'>Notifications</p>
          <div className='flex flex-col gap-2 text-lg'>
            {notifications.map((item, index) => (
              <div key={index} className='flex gap-2 items-center'>
                <div onClick={ () => handleSwitch(item.value)} className={`flex w-[40px] h-[20px] rounded-full cursor-pointer ${toggle[item.value] ? 'bg-accent' : 'bg-gray-600'}`}>
                  <span className={`w-[20px] h-[20px] bg-slate-200 rounded-full  transition-all duration-200 ${toggle[item.value] ? 'ml-[20px]' : ''}`} />
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <button onClick={saveNotifs} className='bg-secondary hover:bg-primary w-[50%]'>Save</button>
        </div>
        <div className='flex flex-col gap-5 text-xl max-w-[400px]'>
          <p className='text-primary'>Delete account</p>
          <p className='break-words'>Once you delete your account, you cannot restore it!</p>
          <div className='flex gap-3'>
            <input onChange={handleChecked} type='checkbox'/>
            <p className='text-sm'>I confirm that I want to delete my account without the possibility of recovery</p>
          </div>
          <button onClick={handleDelete} className={`text-lg px-4 py-3 ${checked ? 'bg-secondary hover:bg-primary' : 'hover:bg-second bg-second'}`} disabled={checked ? false : true}>Delete account</button>
        </div>
      </div>
    </div>
  )
}
