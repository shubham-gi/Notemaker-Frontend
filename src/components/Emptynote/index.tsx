import addNote from "../../assets/addNote.png";
const EmptyNote = ({ setOpenEditAddModal }:{setOpenEditAddModal:any}) => {
  return (
    <div className=" flex flex-col justify-center items-center py-28">
      <img
        src={addNote}
        alt="add notes"
        className="text-white invert h-40 cursor-pointer"
        onClick={() =>
          setOpenEditAddModal({ isShown: true, type: "add", data: null })
        }
      />
      <p className="mt-4 text-xl">
        Start creating your first note!. Click the above button to add new
        notes.
      </p>
    </div>
  );
};

export default EmptyNote;
