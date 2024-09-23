import { Link, useNavigate } from "react-router-dom"
import ProfileInfo from "./Cards/ProfileInfo"
// import Searchbar from "./Searchbar";


const Navbar = () => {
  // const [searchQuery, setSearchQuery] = useState<string>("")
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  // const handleSearch = () => {
  //     console.log(searchQuery)
  // }
  // const clearSearch = () => {
  //     setSearchQuery("")
  // }

  return (
    <nav className="bg-dark-2 flex items-center justify-between px-3 sm:px-6 py-2 drop-shadow gap-2">

      <div className="flex gap-4 sm:gap-10">
        <Link to={'/dashboard'} className="text-white font-medium text-sm sm:text-xl py-2 italic hover:text-blue-200">NoteMaker</Link>
        <Link to={'/generate-notes'} className="text-white font-medium text-sm sm:text-xl py-2 italic hover:text-blue-200">
          Generate Notes
        </Link>
      </div>
      {/* <Searchbar onChange={(e)=>{
            setSearchQuery(e.target.value)
            
        }} handleSearch={handleSearch} onClear={clearSearch} value={searchQuery}/> */}
      <ProfileInfo onLogOut={onLogout} />
    </nav>
  )
}

export default Navbar