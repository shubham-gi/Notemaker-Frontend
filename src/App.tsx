import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Signin from './pages/SignIn';
import GenerateNotes from './pages/GenerateNotes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Authprovider from './providers/Authprovider';

const App = () => {
  return (
    <div className="min-h-screen  overflow-auto bg-dark-1 text-white">
      <Router>
        <Authprovider>
          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/generate-notes" element={<GenerateNotes />} />
          </Routes>
        </Authprovider>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
