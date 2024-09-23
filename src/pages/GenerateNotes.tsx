import { useContext, useEffect } from "react"
// import Navbar from "../components/Navbar"
import { AuthContext } from "../providers/Authprovider"
import GetSummary from "../components/GetSummary"

// import { useNavigate } from "react-router-dom"

const GenerateNotes = () => {
  
  const { user } = useContext(AuthContext)
  // const navigate=useNavigate();
  useEffect(() => {
    console.log(user)
    if (!user) {
      // navigate("/login")
    }

  }, [])

  return (
    <GetSummary/>
  )
}
export default GenerateNotes