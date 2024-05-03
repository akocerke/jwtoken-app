import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";


function App() {
  return (
    <Router>
      <>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
