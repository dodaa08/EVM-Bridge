import { useReadContract } from "wagmi";
import { ABI } from "../../abi/abi";
import Approve from "./Approve";
import { useState } from "react";



const Hero = ()=>{
    const {data, isLoading, error}  = useReadContract({
        address : "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        abi : ABI,
        functionName : "totalSupply",
    });

    const [spender, setSpender] = useState("");
    const [amount, setAmount] = useState("");



    return(
        <>
         <div className="text-white">
            {
                !error ? <>
                  {
                isLoading ? <> 
                  <div>
                      Loading...
                  </div>
                </> : <>
                <div className="flex justify-center text-2xl">
                     Total Supply : {data?.toString()}
                </div>
                </> 
            }
                 </>
                 : 
                 <>
                 <div>
                      error.. {error?.toString()}
                 </div>
                 </>
            }         

            <div className="flex justify-center items-center py-20">
                <div className="flex flex-col gap-5">
                    <input type="text" value={spender} onChange={(e)=>setSpender(e.target.value)}   placeholder="Enter Spender:"/>
                    <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)}  placeholder="Enter Amount: "/>
                
                    <div>
                    <Approve  spender={spender} amount={parseInt(amount)}/>
                </div>
                </div>

               
            </div>
           
        </div>
        </>
    )
}

export default Hero;