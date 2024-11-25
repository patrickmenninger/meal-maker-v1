import React from 'react'

const Button = ({children, type = "submit", variant = "primary", disabled = false}) => {

    const variantStyle = variant === "primary" ?
        "bg-olive_green hover:bg-olive_green hover:opacity-75 disabled:bg-gray-500 disabled:opacity-30" :
        "bg-blue-500 hover:bg-blue-600"

  return (
    <button 
      type={type}
      className={`py-2 rounded-md ${variantStyle} text-white`}
      disabled={disabled}
      >
        {children}
    </button>
  )
}

export default Button