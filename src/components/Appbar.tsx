import React from 'react'
interface appBarProps{
    user:string
}
function Appbar({user}:appBarProps) {
  return (
    <div className=' border-b-2 pb-3 border-slate-400'>
        <header className='flex items-center justify-between'>
            <h2 className='font-bold text-2xl'>Payment App</h2>
            <div className='flex gap-2 items-center'>
                <h3>Hello, {user}</h3>
                <div className='w-[40px] h-[40px] items-center bg-slate-200 p-3 rounded-full flex text-center justify-center'>
                    <p>U</p>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Appbar