import { Route, Routes } from "react-router";
import "./App.css";
import UserMain from './Components/UserSide/UserMain/UserMain'
import CourierMain from "./Components/CourierSide/CourierMain/CourierMain";
import Admin from "./Components/Admin/Admin";
import { useState } from "react";
import { UserContext } from "./Context/UserContext";
import SignIn from "./Components/RegisterSide/SignIn/SignIn";
import SignUp from "./Components/RegisterSide/SignUp/SignUp";
import ForgotPassword from "./Components/RegisterSide/ForgotPassword/ForgotPassword";

function App() {
  const [user, setUser] = useState({ name: '', surname: '', email: '' });
  const contextValue = { user, setUser }


  return (
    <div className="App">
      <UserContext.Provider value={contextValue}>
        <Routes>
          <Route path="/delivery-app/" element={<SignIn />} />
          <Route path="/delivery-app/signup" element={<SignUp />} />
          <Route path="/delivery-app/user/:userID" element={<UserMain />} />
          <Route path="/delivery-app/courier" element={<CourierMain />} />
          <Route path="/delivery-app/forgotpassword" element={<ForgotPassword />} />
          <Route path="/delivery-app/admin" element={<Admin />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
