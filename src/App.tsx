import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/App.css";
import "./styles/utilities.css";
import "./styles/colors.css";

import SignUp from "./pages/SignUp";

const App = () => {
  return (
<<<<<<< HEAD
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>hello from react </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
=======
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
>>>>>>> 6844d7673b11f1c06a9dad64317c9b6a217b4616

export default App;
