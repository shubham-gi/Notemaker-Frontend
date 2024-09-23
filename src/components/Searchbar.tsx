import {  MouseEventHandler } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

interface SearchbarProps {
    onClear: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    handleSearch: MouseEventHandler<SVGElement>;
}

const Searchbar = ({  onClear, value, handleSearch, onChange }: SearchbarProps) => {
    return (
        <div className="w-96 flex items-center bg-dark-light px-3 rounded-md">
            <input value={value} type="text"  onChange={onChange} placeholder="Search Notes" className="w-full text-sm bg-transparent py-[11px] outline-none " />
            {value && <IoMdClose onClick={onClear} size={25} className="cursor-pointer text-[#dcddd44] " />}
            <FaMagnifyingGlass size={19} className="text-white text-xs ml-2 cursor-pointer" onClick={handleSearch} />

        </div>
    )
}

export default Searchbar