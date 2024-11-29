import logo from "../assets/images/logo.png";
import "../assets/css/header.css";
import LoginIcon from "@mui/icons-material/Login";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/user";
import { removeToken } from "../helpers/storage";
const Header = () => {
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
        <NavLink to={"/agendamento"}>
          <li className="underlined-item padding-2">Agendamento</li>
        </NavLink>
      </ul>
      <span onClick={logout} className="underlined-item padding-2 display-flex">
        <LoginIcon />
      </span>
    </div>
  );
};

export default Header;
