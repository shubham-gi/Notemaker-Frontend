import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
}
const PasswordInput = ({value,onChange,placeholder}:PasswordInputProps) => {
    const [isShowPassword, setisShowPassword] = useState<Boolean>(false)
    const toggleShowPassword = () => { setisShowPassword(prev=>!prev) }
    
  return (
    <div className="flex w-full border-[#a4a4a422] border-2 items-center bg-transparent  rounded mb-3">
        <input 
        value={value}
        required
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"} 
        onChange={onChange}
        className="w-full px-3  bg-transparent py-3 mr-3 rounded outline-none text-md  "
        />
        <div className="px-3 cursor-pointer " onClick={()=>{
            toggleShowPassword()
        }}>
            
        {isShowPassword?<FaRegEye size={22} className="text-[#e4e4e4]"/>:
        <FaRegEyeSlash size={22} className="text-[#b5b5b6]"/>}
        </div>
    </div>
  )
}

export default PasswordInput