import './globals.css'
import React from 'react';

export const metadata = {
  title: 'itkbroke',
  description: 'From broke people to broke people',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        { children }
      </body>
    </html>
  )
}
