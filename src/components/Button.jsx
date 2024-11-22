import React from 'react'

const Button = ({children, type = "submit", variant = "primary"}) => {

    const variantStyle = variant === "primary" ?
        "bg-olive_green hover:bg-olive_green hover:opacity-75" :
        "bg-blue-500 hover:bg-blue-600"

  return (
    <button 
      type={type}
      className={`py-2 rounded-md ${variantStyle} text-white`}
      >
        {children}
    </button>
  )
}

export default Button