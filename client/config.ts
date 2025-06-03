import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected} from 'wagmi'


export const config = createConfig({
  connectors : [injected()],
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http("https://mainnet.infura.io/v3/508898ecaa0a478cacc55da14648d302"),
    [sepolia.id]: http("https://sepolia.infura.io/v3/508898ecaa0a478cacc55da14648d302"),
  },
})


