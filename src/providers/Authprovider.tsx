import { Loader } from "../components/Loader";
import axiosInstance from "../utils/axiosInstance"
import { ReactNode, useEffect, useState } from "react"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
interface userInfoType {
    email: string;
    name: string;
    _id: string;
}
export const AuthContext = createContext({user:undefined} as {user:userInfoType | undefined,isSignedIn:boolean,signOut:()=>void,setisSignedIn:(value:boolean)=>void});
const Authprovider = ({ children }:{children:ReactNode}) => {
    const [isSignedIn, setisSignedIn] = useState(false);
    const [loading, setloading] = useState(true);
    const [userInfo, setUserInfo] = useState<userInfoType | undefined>();
    const navigate = useNavigate();
    const fetchUserDetails = async () => {
        try {
            const response = await axiosInstance.get("/api/auth/get-user");
            console.log(response.data);
            if (response.data.error) {
                localStorage.clear();
                toast.info("Please login to continue")
                navigate("/login");
                return;
            }
            setisSignedIn(true);
            setUserInfo(response.data.user);
        } catch (error:any) {
            console.log(error);
            toast.info("Please login to continue");
            setisSignedIn(false);
            localStorage.clear();
            navigate("/login");
        } finally {
            setloading(false);
        }
    }
    const signOut = () => { 
        setisSignedIn(false);
        setUserInfo(undefined);
        navigate("/login");
        localStorage.clear();
    }
    useEffect(() => {
        fetchUserDetails();
    }, [isSignedIn])
    if (loading) {
        return <Loader className="h-screen w-screen flex justify-center items-center"/>
    }
    return (
        <AuthContext.Provider value={{user:userInfo,isSignedIn,signOut,setisSignedIn}} >
            { children }
        </AuthContext.Provider >
    )
}

export default Authprovider