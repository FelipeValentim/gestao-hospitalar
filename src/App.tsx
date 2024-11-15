import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
