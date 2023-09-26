import './globals.css'
import React from 'react';

export const metadata = {
  title: 'itkbroke',
  description: 'From broke people to broke people',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/zxcursed.gif" sizes="any" />
      </head>
      <body className='bg-background'>
        { children }
      </body>
    </html>
  )
}
