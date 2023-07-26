import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import Detail from './Views/Detail/Detail'
import Form from './Views/Form/ Form'
import FormStores from './Views/FormStores/FormStores'
import About from './Views/About/About'
import Nav from './Components/Nav/Nav'
import Stores from './Views/Stores/Stores'
import Footer from './Components/Footer/Footer'
import Login from './Views/Login/Login'
import Account from './Views/Account/Account'
import Admin from'./Views/Admin/Admin'
import './App.css'
import Success from './Views/Success/Success'
import Failure from './Views/Failure/Failure'
import UserDashboard from './Views/UserDashboard/UserDashboard'
import AboutProgrammers from './Views/AboutProgrammers/AboutProgrammers'
import AboutUs from './Views/AboutUs/AboutUs'

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/'
  return (
    <div>
      {
        location.pathname !== '/'  && <Nav></Nav>
      }
      <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home/>} />
      <Route path='/detail/:id' element={<Detail />}/>
      <Route path='/post' element={<Form />} />
      <Route path='/postStores' element={<FormStores />} />
      <Route path='/stores' element={<Stores />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/account' element={<Account/>} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/success' element={<Success/>} />
      <Route path='/failure' element={<Failure/>} />
      <Route path='/dashboard' element={<UserDashboard/>} />
      <Route path='/about' element={<AboutUs/>} />
    </Routes>
    {!isLandingPage && location.pathname !== '/admin' && <Footer />}
      
    </div>
    
  )
}

export default App
