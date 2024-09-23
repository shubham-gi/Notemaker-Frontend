import { AuthContext } from "../../providers/Authprovider.js";
import { getFirstName, getInitials } from "../../utils/helper"
import { useContext } from "react"
const ProfileInfo = ({ onLogOut }: { onLogOut: () => void }) => {
  const { user,signOut,isSignedIn } = useContext(AuthContext);
  console.log("profileInfo", user)
  if (!user) {
    return (
      <div className="flex gap-2 items-center">
        <div className="px-2 flex flex-col justify-center">
          <button className="text-lg  px-2" onClick={onLogOut}>
            Login
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="rounded-full h-10 w-10 bg-[#68686844] flex justify-center items-center p-2">
        {getInitials(user?.name)}
      </div>

      <div className="px-2 flex flex-col justify-center items-center">
        <p className="font-medium text-sm ">{getFirstName(user?.name)}</p>
        <button className="text-sm underline px-2" onClick={signOut}>
          LogOut
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo