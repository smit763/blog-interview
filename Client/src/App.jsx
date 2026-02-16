import './App.css'
import { Routes, Route } from "react-router-dom";
import BlogPage from './page/BlogPage';
import Login from './page/auth/Login';
import Register from './page/auth/Register';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<BlogPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
