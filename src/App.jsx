import Hero from "./components/Hero"
import About from "./components/About"
import Navbar from "./components/Navbar"
import Features from "./components/Features"
import Story from "./components/Story"
import Work from "./components/Work"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import { StarsCanvas } from "./components/canvas"


const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden ">
      <Navbar/>
     <Hero/>
     <About/>
     <Features/>
     <Story/>
     <Work/>
     <div className="relative z-0">
     <Contact/>
     <StarsCanvas/>
     </div>
     <Footer/>
    </main>
  )
}
export default App