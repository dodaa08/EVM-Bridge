import { useWriteContract } from "wagmi"
import {ABI} from "../../abi/abi"
import type { FC } from "react";


interface ApproveT{
    spender : String,
    amount : number
}


const Approve : FC<ApproveT> = ({spender, amount})=>{

    const {writeContract, isPending, isSuccess, error} = useWriteContract();

    const handleABI = ()=>{
        writeContract({
            address : "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            abi : ABI,
            functionName : "approve",
            args : [spender, amount]
        })
    }



    return(
        <>
        <div>
            <button className="" onClick={handleABI} disabled={isPending}> 
                {isPending ? "Approving.." : "Approved" }
            </button>
            {isSuccess && <p>✅ Approved successfully</p>}
            {error && <p>❌ Error: {error.message}</p>}
        </div>
        </>
    )
} 

export default Approve;