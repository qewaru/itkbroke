"use clinet"
import React, { useState, useEffect } from 'react'

export default function LogAccount() {
    const [ user, setUser ] = useState(null)
    const [switcher, setSwitcher] = useState('signup')
    const [error, setError] = useState('')
    const [userData, setUserData] = useState({
      name1: '',
      name2: '',
      email: '',
      password: '',
      date: '',
      role: 'user'
    })
  
    const handleSwitch = (type) => {
      setSwitcher(type)
    }
  
    const handleError = (type) => {
      setError(type)
    }
  
    const handleInput = (event) => {
      const { name, value } = event.target
      setUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  
    const handleReg = async (event) => {
      event.preventDefault()
      const currentDate = new Date().toISOString().substring(0, 10)
      const userDataNew = {
        ...userData,
        date: currentDate,
      };
      const response = await fetch('http://localhost:4000/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDataNew),
        credentials: 'include'
      })
  
      const data = await response.text()
      if (data === 'Allowed') {
        localStorage.setItem('hasLoggedIn', 'true')
        location.reload()
      } else {
        handleError(data)
      }
    }
  
    const handleLog = async (event) => {
      event.preventDefault()
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      })
      const data = await response.text()
      if (data === 'Allowed') {
        localStorage.setItem('hasLoggedIn', 'true')
        location.reload()
      } else if (data === 'AllowedEntry') {
        sessionStorage.setItem('isAdmin', 'true')
        window.location.href = 'http://localhost:3000/dashboard'
      } else {
        handleError(data)
      }
    }

    useEffect(() => {
      const token = localStorage.getItem('jwt')
      if (token) {
        const decode = jwt_decode(token)
        setUser(decode)
      }
    }, [])

  return (
    <div className='flex flex-col gap-10 items-center py-10'>
        <header>
            <p className='text-lg'>You must log in or sign up to use Profile settings</p>
        </header>
        <footer>
        <div className='flex flex-col justify-center items-center w-[500px] h-auto'>
        {switcher === 'login' && 
          <form onSubmit={handleLog} className='w-full'>
            <section className='flex flex-col gap-5 items-center w-full py-5 px-14'>
              <div className='flex flex-col gap-5 w-full'>
                <input
                name='email'
                placeholder='E-mail' 
                value={userData.email}
                onChange={handleInput}
                />
                <input 
                type='password'
                name='password'
                placeholder='Password'
                value={userData.password}
                onChange={handleInput}
                />
              </div>
              <div className='flex justify-between w-full px-3'>
                <div className='flex gap-3'>
                  <input type='checkbox' />
                  <p>Remember me</p>
                </div>
                <a href='#' className='underline hover:text-primary'>Forgot password?</a>
              </div>
            </section>
            <section className='flex justify-center w-full py-3 px-14'>
            <p className='text-sm text-center text-[#E96565]'>
              {error === 'DenyPassword' && 'Password is incorrect. Try again'}
              {error === 'DenyEmail' && 'Email is incorrect. Try again'}
            </p>
            </section>
            <footer className='flex flex-col gap-5 items-center w-full py-5 px-14'>
              <button type='sumbit' className='bg-primary px-4 py-3 w-[70%]'>Log in</button>
              <button onClick={ () => handleSwitch('signup') } href='#' className='hover:underline'>Sign up</button>
            </footer>
          </form>
        }
        {switcher === 'signup' && 
          <form onSubmit={handleReg} className='w-full'>
            <section className='flex flex-col gap-5 items-center w-full py-5 px-14'>
              <div className='flex flex-col gap-5 w-full'>
                <div className='flex gap-4'>
                  <input 
                  className='w-1/2'
                  placeholder='First name' 
                  name='name1'
                  value={userData.name1}
                  onChange={handleInput}
                  />

                  <input 
                  className='w-1/2'
                  placeholder='Last name' 
                  name='name2'
                  value={userData.name2}
                  onChange={handleInput}
                  />

                </div>
                <input
                placeholder='E-mail'
                name='email'
                value={userData.email}
                onChange={handleInput}
                />

                <input
                type='password'
                placeholder='Password'
                name='password'
                value={userData.password}
                onChange={handleInput}
                />

                <input type='password' placeholder='Confirm password' />
              </div>
              <div className='flex flex-col gap-3 w-full px-3'>
                <div className='flex gap-3'>
                  <input type='checkbox' />
                  <p>I accept <a href='#' className='underline'>Privacy Policy</a></p>
                </div>
                <div className='flex gap-3'>
                  <input type='checkbox' />
                  <p>Keep me on track with newsletter  </p>
                </div>
              </div>
            </section>
            <section className='flex justify-center w-full py-3 px-14'>
            <p className='text-sm text-center text-[#E96565]'>
              {error === 'Exist' && 'This email is already used for another account. Try to log in'}
            </p>
            </section>
            <footer className='flex flex-col gap-5 items-center w-full py-5 px-14'>
              <button type='submit' className='bg-primary px-4 py-3 w-[70%]'>Sign up</button>
              <button onClick={ () => handleSwitch('login') } href='#' className='hover:underline'>Log in</button>
            </footer>
          </form>
        }
      </div>
        </footer>
    </div>
  )
}
