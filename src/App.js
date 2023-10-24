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
        <Route path="/delivery-app/" element={<SignIn />} />
        <Route path="/delivery-app/signup" element={<SignUp />} />
        <Route path="/delivery-app/user" element={<UserMain />} />
        <Route path="/delivery-app/courier" element={<CourierMain />} />
        <Route path="/delivery-app/verify" element={<Verify />} />
        <Route path="/delivery-app/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
