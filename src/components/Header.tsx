import { NavLink } from "react-router-dom";
import './Header.css';
import { useAuth } from "../context/AuthContext";

function Header() {

    const {user, logout} = useAuth();

    return(
        <header>
            <h1>Moment 3</h1>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Startsida</NavLink></li>
                    <li><NavLink to={'/profile'}>Min sida</NavLink></li>
                    <li>
                        {
                            !user ? <NavLink to={'/login'}>Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;