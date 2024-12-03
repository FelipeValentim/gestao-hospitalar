import logo from "../assets/images/logo.png";
import "../assets/css/header.css";
import LoginIcon from "@mui/icons-material/Login";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/user";
import { removeToken } from "../helpers/storage";
import { medicoRoles, pacienteRoles } from "../constants/default";
import RootState from "../interfaces/RootState";
import { useState } from "react";

const Hamburguer = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const logout = () => {
    removeToken();
    dispatch(removeUser());
  };

  return (
    <div className="menu-container">
      <svg
        id="hamburger"
        className={menuOpen ? "hamburguer-header active" : "hamburguer-header"}
        viewBox="0 0 60 40"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <g
          stroke="#000"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path id="top-line" d="M10,10 L50,10 Z"></path>
          <path id="middle-line" d="M10,20 L50,20 Z"></path>
          <path id="bottom-line" d="M10,30 L50,30 Z"></path>
        </g>
      </svg>
      {menuOpen && (
        <div className="menu-items">
          <span>{user?.name}</span>
          <span
            onClick={logout}
            className="underlined-item padding-2 display-flex"
          >
            <LoginIcon />
          </span>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const user = useSelector((state: RootState) => state.user);

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
        {/* {medicoRoles.some((r) => user?.roles.includes(r)) && (
          <NavLink to={"/horarios"}>
            <li className="underlined-item padding-2">Horários</li>
          </NavLink>
        )} */}
      </ul>
      <Hamburguer />
    </div>
  );
};

export default Header;
