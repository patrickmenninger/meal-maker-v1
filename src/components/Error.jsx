import React from 'react'

const Error = ({errMsg}) => {
    
  return (
    <div className={errMsg ? "bg-red-500 bg-opacity-10 border border-red-500 text-red-800 p-4 text-center" : "hidden"}>{errMsg}</div>
  )
}

export default Error