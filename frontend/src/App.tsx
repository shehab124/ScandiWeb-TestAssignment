import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import AllProducts from './components/AllProducts/AllProducts.tsx'

const App = () => {
  return (
      <>
      <Navbar />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<AllProducts />} />
          </Routes>
        </Router>
      </div>
      </>
  )
}

export default App
