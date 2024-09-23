
// import { BounceLoader } from "react-spinners";
import "./Loader.css"
import LoadingDots from "./LoadingDots"
export const Loader = ({ className,message }: { className?: string, size?: number,message?:string }) => {
  return (
    <div className={`${className ? className : "h-screen w-full"} flex flex-col`}>
      {/* <BounceLoader color={"#161925"} loading={true} size={size} /> */}
      <svg viewBox="25 25 50 50" className="svg">
        <circle className="cc" r="20" cy="50" cx="50"></circle>
      </svg>
        <p className="text-gray-400 text-md flex justify-start w-[67.24px] mt-2 " ><span>{message?message:"Loading"}</span> {<LoadingDots/>}</p>
    </div>
  )
}
