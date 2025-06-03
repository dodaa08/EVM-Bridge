import { useConnect, useDisconnect, useAccount } from "wagmi";

const ConnectWallet = () => {
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const isConnected = !!address;

  
  return (
    <div>
      {isConnected ? (
        <div className="flex flex-col gap-5">
          <h1 className="text-white text-2xl">Wallet Address: {address}</h1>
          <div>
            <button
              className="text-white ml-10 text-center border-2 border-gray-500 rounded-xl py-2 px-5"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        connectors.map((wallet, index) => (
          <button
            className="text-white ml-10 text-center border-2 border-gray-500 rounded-xl py-2 px-5"
            key={index}
            onClick={() => connect({ connector: wallet })}
          >
            Connect with {wallet.name}
          </button>
        ))
      )}
    </div>
  );
};

export default ConnectWallet;
