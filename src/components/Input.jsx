import React from 'react'

const Input = ({label, type, placeholder, name, className, value, onChange, onFocus, onBlur, required}) => {
  return (
    <div>
        {label && <label htmlFor={name} className="text-charcoal_gray">{label}</label>}
        <input 
            className={`flex flex-col rounded h-10 border border-black pl-2 mt-2 bg-soft_white ${className}`}
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            required={required}
        />
    </div>
  )
}

export default Input