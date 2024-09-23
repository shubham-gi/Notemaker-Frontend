import { useEffect, useState } from "react"
import InputTags from "./Input/InputTags";
import { IoMdClose } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
interface AddEditNotesProps {
    onClose: () => void
    fetchAllNotes: () => void
    notesData: any
    type: string
}
const AddEditNotes = ({onClose,fetchAllNotes,notesData,type}:AddEditNotesProps) => {
    const [tags, setTags] = useState<string[]>([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    useEffect(() => {
        if(type==='edit'){
            console.log(notesData)
            setTitle(notesData?.title)
            setContent(notesData?.content)
            setTags(notesData?.tags)
        }
    }, [notesData])
    const editNote=async()=>{
        try {
            const response=await axiosInstance.put(`/api/notes/update-note/${notesData._id}`,{
                title,
                content,
                tags
            })
            console.log(response.data)
            if(response.data.error){
                toast.error(response.data.message)
                return;
            }
            fetchAllNotes()
            toast.success("Note Updated Successfully")
            onClose();
        } catch (error:any) {
            console.log(error.message)
            toast.error("Something went wrong")
        }
    }
    const addNote=async()=>{
        try {
            const response=await axiosInstance.post("/api/notes/create-note",{
                title,
                content,
                tags
            })
            console.log(response.data)
            if(response.data.error){
                toast.error(response.data.message)
                return;
            }
            fetchAllNotes()
            toast.success("Note Added Successfully")
            onClose();
        } catch (error:any) {
            console.log(error.message)
            toast.error("Something went wrong")
        }
    }
    const handleAddNote = ()=>{
        if(!title.trim() ){
            alert("Title is required")
            return
        }
        if(!content.trim()){
            alert("Content is required")
            return
        }
        if(tags.length===0){
            alert("Tags are required")
            return
        }
        if(type=='edit'){
            editNote();
        }
        else{
            addNote();
        }

    }
    return (
        <div className="px-4 flex flex-col gap-2 relative overflow-auto">
            <div onClick={onClose} className="absolute right-0 top-0">
                <MdClose className="text-gray-400 text-2xl bg-transparent flex items-center justify-center rounded cursor-pointer hover:text-white" />
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <label className="input-label text-lg">TITLE</label>
                <input type="text" className=" text-lg py-2 bg-slate-800 text-slate-200 outline-none px-3 rounded-lg" placeholder="Go to Gym at 6 AM" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
                <label className="input-label text-lg">CONTENT</label>
                <textarea className="text-md px-3 py-3 bg-slate-800 text-slate-300 outline-none" placeholder="Content" rows={10} onChange={(e) => {
                    setContent(e.target.value)
                }} value={content}></textarea>
            </div>
            <div className="mt-3 overflow-auto">
                <label className="input-label text-lg">TAGS</label>
                <div className="flex gap-2 mt-1 flex-wrap">
                    {tags?.map((tag: string, index: any) => {
                        return (
                            <div className="text-white bg-slate-700  px-2 rounded py-1 flex justify-center items-center"
                                key={index}
                            >
                                <span># {tag.slice(0,25)} {tag.length>25 && "..."}</span> &nbsp;
                                <IoMdClose className="cursor-pointer" onClick={() => {
                                    setTags(tags.filter((item) => item !== tag))
                                }} />
                            </div>
                        )
                    })}
                </div>
                <InputTags tags={tags} setTags={setTags} />
            </div>
            <button className="btn-primary font-medium mt-5 px-3 py-1 hover:bg-white hover:text-dark-1 hover:border-slate-700 text-white border-white border rounded " onClick={handleAddNote}>
                ADD
            </button>

        </div>
    )
}

export default AddEditNotes