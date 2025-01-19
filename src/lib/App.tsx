import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../ui/styles/App.css";
import "../ui/styles/utilities.css";
import "../ui/styles/colors.css";

import SignUp from "../ui/pages/SignUp";
import LogIn from "../ui/pages/LogIn";
import ViewProfile from "../ui/pages/ViewProfile";
import Profile from "../ui/pages/Profile";
import ErrorPage from "../ui/pages/ErrorPage";
import Feed from "../ui/pages/Feed";
import Messaging from "../ui/pages/Messaging";
import TryOuts from "../ui/pages/TryOuts";
import Connections from "../ui/pages/Connections";
import ViewTryOuts from "../ui/pages/ViewTryOuts";
import Approvals from "../ui/pages/Approvals";

import ProtectedRoute from "../core/routes/protectedRoute";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/view/:userId/:role" element={<ViewProfile />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/tryouts" element={<TryOuts />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/view/tryouts" element={<ViewTryOuts />} />
            <Route path="/approvals" element={<Approvals />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
