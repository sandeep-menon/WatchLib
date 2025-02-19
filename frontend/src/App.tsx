import Navbar from "./components/navbar";
import Footer from "./components/footer";
import PopularPeople from "./components/PopularPeople";
function App() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <PopularPeople />
      <Footer />
    </div>
    
  )
}

export default App
