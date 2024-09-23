import { MdCreate, MdDelete, MdPushPin } from "react-icons/md";
interface NoteCardProps {
    title: string;
    date: string;
    content: string;
    tags: string[];
    isPinned: boolean;
    onEdit: () => void;
    onDelete: () => void;
    onPinNote: () => void;
}
const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }: NoteCardProps) => {
    return (
        <div className="border rounded p-4  hover:shadow-xl transition-all ease-in-out flex flex-col ">
            <div className="flex items-center justify-between">
                <div className="">
                    <h6 className="text-sm font-medium">{title.slice(0, 50)} {title.length>50 && "..."} &nbsp; <span className="text-xs text-slate-500">{date}</span></h6>

                </div>
                <MdPushPin className={`icon-btn ${isPinned ? "text-blue-500" : "text-white-100"} ${isPinned ? "hover:text-blue-500" : "hover:text-white-100"}`} onClick={onPinNote} />
            </div>
            <p className="text-xs text-slate-500">{content.slice(0, 500)}</p>
            <div className="flex items-center justify-between mt-2">
                <div className="text-xs">
                    {tags.map((tag, index) => {
                        return (<span key={index} className="text-xs bg-slate-700 text-white px-2 py-1 rounded mr-1">#{tag.slice(0,60)}</span>)
                    })}
                </div>
                <div className="flex items-start gap-2">
                    <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
                    <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
                </div>

            </div>
        </div>
    )
}

export default NoteCard