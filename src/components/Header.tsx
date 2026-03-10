import { NavLink } from "react-router-dom";

function Header() {
    return(
        <header>
            <h1>Moment 3</h1>
            <nav>
                <ul>
                    <li><NavLink to={'/'}>Startsida</NavLink></li>
                    <li><NavLink to={'/profile'}>Min sida</NavLink></li>
                    <li><NavLink to={'/login'}>Logga in</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;