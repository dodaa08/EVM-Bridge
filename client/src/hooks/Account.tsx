import { useAccount } from "wagmi"

const Account = ()=>{
    const {address, isConnected} = useAccount();

    return(
        <>
         <div>
            <h1 className="text-2xl text-white text-center"> {
                isConnected && <>
                    Address : {address}
                </>
                }</h1>
         </div>
        </>
    )
}

export default Account;