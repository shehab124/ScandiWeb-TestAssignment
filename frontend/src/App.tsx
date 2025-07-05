import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.tsx'
import ProductList from './components/ProductList/ProductList.tsx'

const App = () => {
  return (
      <>
      <Navbar />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </Router>
      </div>
      </>
  )
}

export default App
