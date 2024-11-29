import { HashRouter, Route, Routes } from "react-router-dom";
import { getToken } from "./helpers/storage";
import { useDispatch } from "react-redux";
import { decodeToken } from "./services/jwtService";
import { setUser } from "./redux/user";
import { Suspense, useEffect, useState } from "react";
import { ProtectedRoute, UnprotectedRoute } from "./helpers/auth";
import Index from "./views/app";
import Login from "./views/user/login/Login";
import Home from "./views/app/home/Home";
import Schedule from "./views/app/schedule/Schedule";
import AppLayout from "./layout/AppLayout";

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
  }, [dispatch]);

  if (loading) {
    return <div className="loading"></div>;
  }

  return (
    <div className="app">
      <HashRouter>
        <Suspense fallback={<div className="loading"></div>}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Index />
                  </AppLayout>
                </ProtectedRoute>
              }
            >
              <Route path="" element={<Home />} />
              <Route path="/agendamento" element={<Schedule />} />
            </Route>
            <Route
              path="/login"
              element={
                <UnprotectedRoute>
                  <Login />
                </UnprotectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
