import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";
import ProfileUpdate from "./Pages/Profile/ProfilUpdate";
import ProfilemanageUpload from "./Pages/Profile/ProfilemanageUpload";
import Dashboard2 from "./Pages/Daschboard/Dashboard2";


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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route path="/profile/upload" element={<ProfilemanageUpload/>}/>
          <Route path="/dashboard" element={<Dashboard2/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
