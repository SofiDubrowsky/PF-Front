import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import Detail from './Views/Detail/Detail'
import Form from './Views/Form/ Form'
import About from './Views/About/About'
import Nav from './Components/Nav/Nav'
import Stores from './Views/Stores/Stores'
import Footer from './Components/Footer/Footer'
import Store from './Components/Stores/Stores'
import './App.css'


function App() {
  const location = useLocation()
  return (
    <div>
      {
        location.pathname !== '/' && <Nav></Nav>
      }
      <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/detail/:id' element={<Detail />}/>
      <Route path='/post' element={<Form />} />
      <Route path='/about' element={<About />} />
      <Route path='/stores' element={<Stores />} />

    </Routes>
      {
        location.pathname !== '/' && <Footer></Footer>
      }
    </div>
    
  )
}

export default App
