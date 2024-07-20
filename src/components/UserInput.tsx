import React from 'react'
import { Input } from './ui/input'
interface InputProps{
    label:string,
    placeholder:string,
    name: string,
    type?:'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color',
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}
function UserInput({label,value,name,type,onChange,placeholder}:InputProps) {
  return (
    <div>
          <div className='mb-2 font-semibold'>{label}</div>
          <Input value={value} name={name} onChange={onChange} type={type} placeholder={placeholder}/>
    </div>
  )
}

export default UserInput