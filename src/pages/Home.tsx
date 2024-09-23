import NoteCard from '../components/NoteCard'
// import Navbar from '../components/Navbar'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from '../components/AddEditNotes'
import Modal from 'react-modal'
import { useEffect, useState } from 'react'
import moment from 'moment'
// import Authprovider from '../providers/Authprovider'
import axiosInstance from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import EmptyNote from '../components/Emptynote'
interface NoteType {
  _id: string;
  title: string;
  content: string;
  createdOn: string;
  tags: string[];
  isPinned: boolean;
}

const Home = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/api/notes/get-all-notes");
      // console.log(response.data);
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      setNotes(response.data.notes);
    }
    catch (error: any) {
      console.log(error.message);

    }
  }
  useEffect(() => {
    getAllNotes();
  }, []);
  const [openAddEditModal, setOpenEditAddModal] = useState<any>({
    isShown: false,
    type: "add",
    data: null
  })
  const handlePinNote = async (noteId: string, isPinned: boolean) => {
    try {
      const response = await axiosInstance.put(`/api/notes/pin-note/${noteId}`, {
        isPinned: !isPinned
      });
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      getAllNotes();
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");

    }
  }
  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await axiosInstance.delete(`/api/notes/delete-note/${noteId}`);
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      getAllNotes();
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");

    }
  }
  return (

    <>
      
        <div className='container mx-auto'>
          {notes.length > 0 ?
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 mt-8'>
              {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                content={note.content}
                date={moment(note.createdOn).format('DD-MM-YYYY')}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => { setOpenEditAddModal({ isShown: true, type: 'edit', data: note }) }}
                onDelete={() => { handleDeleteNote(note._id) }}
                onPinNote={() => { handlePinNote(note._id, note.isPinned) }} />
              ))}
              </div>
            : <EmptyNote setOpenEditAddModal={setOpenEditAddModal} />}
        </div>
        <button onClick={() => {
          setOpenEditAddModal({ isShown: true, type: 'add', data: null })
        }}>
          <MdAdd className='text-[32px] text-white w-16 h-16 flex items-center justify-center rounded bg-blue-1 hover:bg-blue-500 absolute right-10 bottom-10' />
        </button>
        <Modal
        ariaHideApp={false}
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => { openAddEditModal({ isShown: false, type: 'add', data: null }) }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)"
            }
          }}
          contentLabel="Add Edit Modal"
          className="w-[80%] sm:w-[40%] sm:max-h-3/4 bg-dark-1 rounded-md mx-auto mt-14 sm:p-5  py-4  overflow-x-auto"
        >
          <AddEditNotes fetchAllNotes={getAllNotes} notesData={openAddEditModal?.data} type={openAddEditModal?.type} onClose={() => {
            setOpenEditAddModal({ isShown: false, type: 'add', data: null })
          }} />
        </Modal>
    </>
  )
}

export default Home