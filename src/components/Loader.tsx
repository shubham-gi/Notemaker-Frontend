
import { BounceLoader } from "react-spinners";
export const Loader = ({className,size}:{className?:string,size?:number}) => {
  return (
    <div className={`${className?className:"h-screen w-full"}`}>
        <BounceLoader color={"#161925"} loading={true} size={size} />
    </div>
  )
}
