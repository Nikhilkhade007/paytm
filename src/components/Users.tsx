
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
interface UserProps{
    data:object
}
function Users({data}:UserProps) {
    
    const [filter,setFilter]= useState("")
    const [users,setusers] = useState([])
    useEffect(()=>{
        axios({method:"get",url:`http://localhost:4000/api/users/bulk?filter=${filter}`}).then(r=>{
            setusers(r.data.user)
        })
    },[filter])
    
  return (
    <div>
        <div className='flex flex-col gap-3 pb-3'>
            <div id={data._id}>
                Users
            </div>
            <Input type="text" value={filter} onChange={e=>setFilter(e.target.value)} placeholder='Search users....' />
        </div>
        {users && (
            <div className='flex flex-col gap-2'>
                {
                    users.filter(e=>e._id !== data._id).map((e,index)=>{
                        return (
                        <User data={e} index={index} />
                    )
                    })
                }
            </div>
        )
        }
    </div>
  )
}
interface userProps{
    data:object,
    index:number
}
function User({data,index}:userProps){
    const router = useRouter()
    function handleClick(){

        router.push(`/send?username=${data.username}&email=${data.email}&to=${data._id}`)
    }
    return (
        <div className='flex justify-between' key={data._id} id={data._id}>
                <div className='flex gap-1 items-center'>
                    <div className='w-[40px] flex items-center justify-center h-[40px] bg-slate-200 rounded-full'><p>U{index +1}</p></div>
                <div>{data.username}</div>
            </div>
            <Button onClick={handleClick}>Send Money</Button>
        </div>
    )
}

export default Users