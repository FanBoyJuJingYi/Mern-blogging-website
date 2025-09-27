import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="flex-none w-10">
                <img src={logo} className="w-full" />
            </Link>

            <div className="absolute bg-white w-full left-0 top-full mt-0.! border-b border-grey">

                <input
                    type="text"
                    placeholder="Search"
                    className="w-full md:w-auto"></input>


            </div>


        </nav>
    )
}

export default Navbar;