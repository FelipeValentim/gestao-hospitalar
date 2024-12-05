import { HashRouter, Route, Routes } from "react-router-dom";
import { getToken } from "./helpers/storage";
import { useDispatch, useSelector } from "react-redux";
import { decodeToken } from "./services/jwtService";
import { setUser } from "./redux/user";
import { Suspense, useEffect, useState } from "react";
import { ProtectedRoute, UnprotectedRoute } from "./helpers/auth";
import AppIndex from "./views/app";
import AuthIndex from "./views/user";
import Login from "./views/user/login/Login";
import Register from "./views/user/register/Register";
import HomePaciente from "./views/app/home/Home";
import HomeAdmin from "./views/admin/home/Home";
import HorarioAdmin from "./views/admin/horario/Horario";

import Schedule from "./views/app/schedule/Schedule";
import AppLayout from "./layout/AppLayout";
import RootState from "./interfaces/RootState";
import { medicoRoles, pacienteRoles } from "./constants/default";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const token = getToken();

      if (token) {
        const payload = await decodeToken(token);
        if (payload.data) {
          dispatch(
            setUser({
              id: payload.data.id,
              name: payload.data.name,
              roles: [...payload.data.roles],
            })
          );
        }
      }
      setLoading(false);
    };
    getUser();
  }, [dispatch]);

  useEffect(() => {
    if (user !== null) {
      setRoles(user.roles);
    }
  }, [user]);

  if (loading) {
    return <div className="loading"></div>;
  }
  console.log(roles);
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
                    <AppIndex />
                  </AppLayout>
                </ProtectedRoute>
              }
            >
              {pacienteRoles.some((r) => user?.roles.includes(r)) && (
                <>
                  <Route path="" element={<HomePaciente />} />
                  <Route path="/agendamento" element={<Schedule />} />
                </>
              )}
              {medicoRoles.some((r) => user?.roles.includes(r)) && (
                <>
                  <Route path="" element={<HomeAdmin />} />
                  <Route path="/horarios" element={<HorarioAdmin />} />
                </>
              )}
            </Route>
            <Route
              path="/user"
              element={
                <UnprotectedRoute>
                  <AuthIndex />
                </UnprotectedRoute>
              }
            >
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/register" element={<Register />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
