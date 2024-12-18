import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../styles/App.css";
import "../styles/utilities.css";
import "../styles/colors.css";

import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
