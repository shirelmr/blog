import './App.css'
import { Routes, Route, Link } from 'react-router'
import Home from './Home'
import Blog from './Blog'
import Contact from './Contact'

function App() {
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='nav-link'>Home</Link>
        <Link to='/blog' className='nav-link'>Blog</Link>
        <Link to='/contact' className='nav-link'>Contacto</Link>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
