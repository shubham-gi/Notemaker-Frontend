import { Link ,useNavigate} from "react-router-dom"
import PasswordInput from "../components/Input/PasswordInput"
import { useContext, useEffect, useState } from "react";
import { validateEmail } from "../utils/helper";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance"
import { AuthContext } from "../providers/Authprovider";

const Signin = () => {
    const [loading, setloading] = useState(false)
    const {setisSignedIn,isSignedIn}=useContext(AuthContext)
    const navigate=useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    useEffect(() => {
        if(isSignedIn){
            navigate("/dashboard")
            toast.info("Already Logged In")
        }
    },[])
    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // toast.success("Login Successfull")
        if(!validateEmail(email)){
            toast.error("Invalid Email")
            return;
        }
        // if(password.length<6){
        //     toast.error("Password must be atleast 6 characters long")
        //     return;
        // }
        try {
            setloading(true)
            const response=await axiosInstance.post("/api/auth/login",{
                email,
                password
            })
            console.log(response.data)
            if(response.data.error){
                toast.error(response.data.message)
                return;
            }
            toast.success("Login Successfull")
            setisSignedIn(true)
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }finally{
            setloading(false)
        }

    }
    return (
        <div>
            <div className="flex items-center justify-center h-[80vh] ">
                <div className="border-black- border-2 px-24 py-16 rounded-sm">
                    <h1 className="text-3xl font-extrabold mb-4">Login</h1>
                    <form action="" className="flex flex-col gap-2 w-80" onSubmit={handleLogin}>
                        <div className="flex w-full items-center bg-transparent border-[#a4a4a422] border-2 rounded mb-3">
                            <input
                                required
                                value={email}
                                placeholder={"Email"}
                                type={'email'}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full  px-3  bg-transparent py-3 mr-3 rounded outline-none text-md"
                            />

                        </div>
                        <PasswordInput value={password} placeholder={""} onChange={(e) => {setPassword(e.target.value) }}  />
                        <div className="flex ">
                            <button className={`${loading?"bg-blue-300":"bg-blue-500"} text-white py-2 px-4 rounded-md mt-2 w-fit`} disabled={loading}>Sign In</button>
                            
                            
                        </div>
                        <p className="font-extraligh "><span className="text-white">Not Registered Yet?</span> &nbsp;
                            <Link to="/signup" className="text-blue-500">Sign Up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin