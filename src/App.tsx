import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import { getToken } from "./helpers/storage";
import { useDispatch } from "react-redux";
import { decodeToken } from "./services/jwtService";
import { setUser } from "./redux/user";
import { useEffect, useState } from "react";
import { ProtectedRoute, UnprotectedRoute } from "./helpers/auth";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const token = getToken();

      if (token) {
        const payload = await decodeToken(token);
        if (payload.data) {
          dispatch(setUser(payload.data.id));
        }
      }
      setLoading(false);
    };
    getUser();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <UnprotectedRoute>
                <Login />
              </UnprotectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
