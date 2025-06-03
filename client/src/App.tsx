import {BrowserRouter} from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { WagmiProvider } from "wagmi";
import {config} from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App(){
  const routes = [
    {
      path : "/",
      element : <Landing /> 
    }
  ]
  return( 
    <>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>

      <BrowserRouter>
        <Routes>
          {
            routes.map((route, index)=> (
              <Route path={route.path} element={route.element} key={index} />
            ))
          }
        </Routes>
      </BrowserRouter>
          </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}

export default App;
