import { Route, Routes } from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import Detail from './Views/Detail/Detail'
import Form from './Views/Form/ Form'
import About from './Views/About/About'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/detail/:id' element={<Detail />}/>
      <Route path='/post' element={<Form />} />
      <Route path='/about' element={<About />} />
    </Routes>
  )
}

export default App
