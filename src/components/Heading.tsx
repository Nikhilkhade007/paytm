import React from 'react'
interface HeadingProps{
    title:String,
    subHeading: String
}
function Heading({title,subHeading}:HeadingProps) {
  return (
    <div className='w-[300px] text-center flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className=' text-slate-700'>{subHeading}</p>
    </div>
  )
}

export default Heading;