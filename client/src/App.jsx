import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router'
import Home from './Home'
import Blog from './Blog'
import Contact from './Contact'
import Post from './components/Post';
import NewPost from './components/NewPost';
import Login from './components/Login';

function ProtectedRoute({ isAuthenticated, children }) {
  if (isAuthenticated === null) {
    return <p>Cargando sesion...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/session-info`, {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(Boolean(data?.isAuthenticated || data?.id_author));
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  function handleLogout() {
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: 'POST',
      credentials: 'include'
    })
      .finally(() => {
        setIsAuthenticated(false);
      });
  }

  return (
    <>
      <nav className='navbar'>
        {isAuthenticated ? (
          <>
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='/blog' className='nav-link'>Blog</Link>
            <Link to='/contact' className='nav-link'>Contacto</Link>
            <button type='button' className='nav-link nav-button' onClick={handleLogout}>Cerrar sesion</button>
          </>
        ) : (
          <Link to='/login' className='nav-link'>Login</Link>
        )}
      </nav>

      <Routes>
        <Route path='/login' element={
          isAuthenticated ? <Navigate to='/' replace /> : <Login onLoginSuccess={() => setIsAuthenticated(true)} />
        }
        />
        <Route path='/' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/new' element={<ProtectedRoute isAuthenticated={isAuthenticated}><NewPost /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Contact /></ProtectedRoute>} />
        <Route path='/blog/:id_post' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Post /></ProtectedRoute>} />
        <Route path='*' element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
      </Routes>
    </>
  )
}

export default App
