import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'

const InputTags = ({tags,setTags}:{tags:string[],setTags:(tags:string[])=>void}) => {
    const [inputValue, setinputValue] = useState<string>("");
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setinputValue(e.target.value)
    }
    const handleAddTag = ()=>{
        console.log("handle tag clicked")
        if(inputValue.trim()!==''){
            setTags([...tags!,inputValue.trim()])
            setinputValue('')
        }
    }
    const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            handleAddTag()
        }

    }

  return (
    <div>
        <div className='flex items-center gap-4 mt-3'>
            <input type="text" className='text-sm bg-slate-700 border px-3 py-2 rounded outline-none text-slate-300' onChange={handleChange} value={inputValue} onKeyDown={handleKeyDown}/>
            <button className='w-8 h-8 flex items-center justify-center bg-slate-700 rounded border hover:bg-slate-500' onClick={handleAddTag}>
                <MdAdd className='text-white text-2xl bg-transparent flex items-center justify-center rounded  ' />
            </button>
        </div>
    </div>
  )
}

export default InputTags