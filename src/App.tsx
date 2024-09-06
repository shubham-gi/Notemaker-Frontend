import Home from './pages/Home'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Signin from './pages/SignIn'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const routes=(<Router>
  <Routes>
    <Route path="/dashboard" element={<Home/>}/>
  </Routes>
  <Routes>
    <Route path="/login" element={<Signin/>}/>
  </Routes>
  <Routes>
    <Route path="/signup" element={<SignUp/>}/>
  </Routes>

</Router>)
const App = () => {
  return (
    <div className='h-screen w-full bg-dark-1 text-white'>
      
      {routes}
      <ToastContainer />
    </div>
  )
}

export default App