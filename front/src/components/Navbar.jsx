import "./Navbar.css";

import { NavLink, Link } from "react-router-dom";
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill } from "react-icons/bs";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, reset } from '../slices/authSlice'

const Navbar = () => {

    const { auth } = useAuth();
    const isAdmin = useIsAdmin();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/auth/login");
    };

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
            {auth ? (
                <>
                    <li>
                        <NavLink to="/">
                            <BsHouseDoorFill />
                        </NavLink>
                    </li>
                    {isAdmin && (
                        <li>
                            <NavLink to="/criar-filme">Criar Filme</NavLink>
                        </li>
                    )}
                    <li>
                        <span onClick={handleLogout}>Sair</span>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to="/auth/login">Entrar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/auth/register">Cadastrar</NavLink>
                    </li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar