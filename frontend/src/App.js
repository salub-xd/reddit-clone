import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Error from './pages/error/Error';
import Post from './pages/post/Post';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route eaxt path='/' element={<Home />} />
          <Route eaxt path='/post' element={<Post />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;