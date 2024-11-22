import React from 'react'

const Card = ({children, bg = 'bg-gray-100'}) => {
  return (
    <div className={`${bg} rounded-lg shadow-md p-5`}>
        {children}
    </div>
  )
}

export default Card