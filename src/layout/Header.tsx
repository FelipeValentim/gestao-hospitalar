import logo from "../assets/images/logo.png";
import "../assets/css/header.css";
import LoginIcon from "@mui/icons-material/Login";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/user";
import { removeToken } from "../helpers/storage";
import { medicoRoles, pacienteRoles } from "../constants/default";
import RootState from "../interfaces/RootState";
const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    removeToken();
    dispatch(removeUser());
  };

  return (
    <div
      className={
        "header display-flex justify-content-space-evenly padding-5 align-items-center"
      }
    >
      <Link to={"/"}>
        <img src={logo} title="Clinica"></img>
      </Link>
      <ul className="display-flex gap-3">
        <NavLink to={"/"}>
          <li className="underlined-item padding-2">Consultas</li>
        </NavLink>
        {pacienteRoles.some((r) => user?.roles.includes(r)) && (
          <NavLink to={"/agendamento"}>
            <li className="underlined-item padding-2">Agendamento</li>
          </NavLink>
        )}
        {medicoRoles.some((r) => user?.roles.includes(r)) && (
          <NavLink to={"/horarios"}>
            <li className="underlined-item padding-2">Horários</li>
          </NavLink>
        )}
      </ul>
      <span onClick={logout} className="underlined-item padding-2 display-flex">
        <LoginIcon />
      </span>
    </div>
  );
};

export default Header;
