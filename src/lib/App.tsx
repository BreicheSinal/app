import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../ui/styles/App.css";
import "../ui/styles/utilities.css";
import "../ui/styles/colors.css";

import SignUp from "../ui/pages/SignUp";
import LogIn from "../ui/pages/LogIn";
import Feed from "../ui/pages/Feed";
import Profile from "../ui/pages/Profile";

import ProtectedRoute from "../core/routes/protectedRoute";

const App = () => {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = Boolean(token);
  //console.log(token);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
