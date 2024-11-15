import { lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const ViewLogin = lazy(() => import("./Login"));
const ViewHome = lazy(() => import("./Home"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/gestao-hospitalar" element={<ViewHome />}></Route>
          <Route
            path="/gestao-hospitalar/Login"
            element={<ViewLogin />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
