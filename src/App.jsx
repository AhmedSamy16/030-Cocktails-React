import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from "./pages/Home"
import About from "./pages/About"
import Error from "./pages/Error"
import SingleCocktail from "./pages/SingleCocktail"
import Navbar from "./components/Navbar"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cocktail/:id' element={<SingleCocktail />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
