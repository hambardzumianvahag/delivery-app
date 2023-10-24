import { Route, Routes } from "react-router";
import "./App.css";
import SignIn from "./Components/Sign-in/SignIn";
import SignUp from "./Components/Sign-up/SignUp";
import UserMain from "./Components/UserMain/UserMain";
import CourierMain from "./Components/CourierMain/CourierMain";
import Admin from "./Components/Admin/Admin";
import Verify from "./Components/Verify/Verify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserMain />} />
        <Route path="/courier" element={<CourierMain />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
