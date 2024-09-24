import React, { useState } from 'react'
import axiosInstance from "../utils/axiosInstance"
import { toast } from "react-toastify";
const GetSummary: React.FC = () => {
    const [loading, setloading] = useState(false)
    const [url, seturl] = useState<string | undefined>();
    const getSummary = async (e:any) => {
        e.preventDefault();
        try {
            if (!url) {
                toast.error("Please enter a valid URL")
                return
            }
            setloading(true)
            const response = await axiosInstance.get(`/api/summary?url=${url}`)
            if(response.data.error){
                toast.error(response.data.message)
                return
            }
            console.log(response.data)
        } catch (error: any) {
            console.log(error.message)
        } finally {
            setloading(false)
        }
    }
    return (
        <div className="min-h-screen flex  w-full justify-center items-center">
            <form action="" onSubmit={getSummary} className="flex flex-col ">
                <input type="text" name="" id="" className="mb-2 bg-dark-2 px-3 py-2 border-gray-300 border-2" placeholder="Enter the Url" onChange={(e:any)=>{
                    seturl(e.target.value)
                }}/>
                <button className={`icon ${loading ? "text-white" : "text-white"} border-2 hover:border-slate-400`} disabled={loading}>{!loading ? "GetSummary" : "Loading..."}</button>
            </form>
        </div>
    )
}

export default GetSummary