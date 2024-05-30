import React from 'react'

function Input(props) {
    const {type,placeholder=null,value,className, onChange, onSubmit=null , required=false} = props
  return (
    <input type={type} placeholder={placeholder} value={value} 
    className={`my-5 p-2 rounded-xl w-1/2 ${className}`} onChange={onChange}
    required={required}
    />
  )
}

export default Input