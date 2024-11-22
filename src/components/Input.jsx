import React from 'react'

const Input = ({label, type, placeholder, name, onChange, required}) => {
  return (
    <div>
        {label && <label htmlFor={name} className="text-charcoal_gray">{label}</label>}
        <input 
            className='flex flex-col rounded-md h-10 border border-black pl-2 mt-2 bg-warm_beige'
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            onChange={onChange}
            required={required}
        />
    </div>
  )
}

export default Input