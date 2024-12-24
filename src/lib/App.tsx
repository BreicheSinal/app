import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../ui/styles/App.css";
import "../ui/styles/utilities.css";
import "../ui/styles/colors.css";

import SignUp from "../ui/pages/SignUp";
import LogIn from "../ui/pages/LogIn";
import Feed from "../ui/pages/Feed";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
