import { useState, useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoutIcon from "../assets/logout.svg";
import userIcon from "../assets/user.svg";
import Navbar from './Navbar';
import { MdMenu, MdClose } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { ShopContext } from '../Context/ShopContext';

function Header() {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { getTotalCartItem } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white ring-1 ring-slate-900/5 z-10">
      <div className="flexBetween px-4 py-3 max-xs:px-2">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" height={60} width={88} />
          </Link>
        </div>
        <Navbar containerStyles="hidden md:flex gap-x-5 xl:gap-x-10 medium-15" />
        <div className={`${menuOpened ? "flex" : "hidden"} md:hidden item-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300`}>
          <Navbar containerStyles="flex flex-col gap-y-12" />
        </div>

        <div className="flexBetween sm:gap-x-2 bold-16">
          {!menuOpened ? (
            <MdMenu className="md:hidden cursor-pointer hover:text-secondary p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full" onClick={toggleMenu} />
          ) : (
            <MdClose className="md:hidden cursor-pointer hover:text-secondary p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full" onClick={toggleMenu} />
          )}
          <div className="flexBetween sm:gap-x-3">
            <NavLink to="cart-page" className="flex relative">
              <FaOpencart className="p-1 h-8 w-8 ring-1 ring-slate-900/30 rounded-full" />
              <span className="flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 absolute -top-2 right-0">{getTotalCartItem()}</span>
            </NavLink>
            {localStorage.getItem('auth-token') ? (
              <NavLink onClick={handleLogout} to="#" className="btn_secondary_rounded flexCenter gap-x-2 medium-16">
                <img src={logoutIcon} alt="Logout icon" height={19} width={19} />Logout
              </NavLink>
            ) : (
              <NavLink to="login" className="btn_secondary_rounded flexCenter gap-x-2 medium-16">
                <img src={userIcon} alt="User icon" height={19} width={19} />Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
