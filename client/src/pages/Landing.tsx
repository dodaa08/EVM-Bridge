import Header from "../components/Landing/header";
import Hero from "../components/Landing/Hero";


const Landing = ()=>{
    return(
        <>
        <div className="bg-black h-screen">
            <div className="flex justify-center items-center py-20">
                <Header />
            </div>

            <div>
                <Hero />
            </div>
        </div>
        </>
    )
}

export default Landing;
