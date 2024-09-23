import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import PasswordInput from "../components/Input/PasswordInput"
import { useContext, useEffect, useState } from "react";
import { validateEmail } from "../utils/helper";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { AuthContext } from "../providers/Authprovider";

const Signin = () => {
    const navigate=useNavigate();
    const {isSignedIn,setisSignedIn}=useContext(AuthContext)
    const [name, setname] = useState<string>("")
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    useEffect(() => {
        if(isSignedIn){
            navigate("/dashboard")
            toast.info("Already Logged In")
        }
    },[])
    const handleSignUp = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // toast.success("Login Successfull")
        if(!validateEmail(email)){
            toast.error("Invalid Email")
            return;
        }
        if(password.length<6){
            toast.error("Password must be atleast 6 characters long")
            return;
        }
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password must be same")
            return;
        }
        try {
            const response=await axiosInstance.post("/api/auth/signup",{
                email,
                name,
                password
            })
            console.log(response.data)
            if(response.data.error){
                toast.error(response.data.message)
                return;
            }
            setisSignedIn(true);
            toast.success("Sign Up Successfull")
            localStorage.setItem("token",response.data.token)
            navigate("/dashboard")
        } catch (error:any) {
            console.log(error.message)
            toast.error("Something went wrong")
        }

    }
    return (
        <div>
            <div className="flex items-center justify-center h-[calc(100vh-60px)]">
                <div className="border-black- border-2 px-24 py-16 rounded-sm">
                    <h1 className="text-3xl font-extrabold mb-4">SignUp</h1>
                    <form action="" className="flex flex-col gap-2 w-80" onSubmit={handleSignUp}>
                        <div className="flex w-full items-center bg-transparent border-[#a4a4a422] border-2 rounded mb-3">
                            <input
                                required
                                value={name}
                                placeholder={"Full Name"}
                                type={'text'}
                                onChange={(e) => { setname(e.target.value) }}
                                className="w-full  px-3  bg-transparent py-3 mr-3 rounded outline-none text-md"
                            />

                        </div>
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
                        <PasswordInput value={confirmPassword} placeholder={"Confirm Password"} onChange={(e) => {setConfirmPassword(e.target.value) }}  />
                        <div className="flex ">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 w-fit">Sign Up</button>
                        </div>
                        <p className="font-extraligh "><span className="text-white">Already have an Account?</span> &nbsp;
                            <Link to="/signup" className="text-blue-500">SignIn</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin