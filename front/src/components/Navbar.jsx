import "./Navbar.css";

import { NavLink, Link } from "react-router-dom";
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav id="nav">
        <form id="search-form">
            <BsSearch />
            <input type="text" placeholder="Pesquisar"/>
        </form>
        <div id="logo">
            <Link to="/" >CineRate</Link>
        </div>
        <ul id="nav-links">
            <li>
                <NavLink to="/">
                    <BsHouseDoorFill />
                </NavLink>
            </li>
            <li>
                <NavLink to="/auth/login">Entrar</NavLink>
            </li>
            <li>
                <NavLink to="/auth/register">Cadastrar</NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar