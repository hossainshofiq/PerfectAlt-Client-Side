import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthHook from '../../Hooks/useAuthHook';
import { Tooltip } from 'react-tooltip';
import websiteLogo from '../../assets/quires_logo.png'
const Navbar = () => {

    const { user, loading, signOutUser } = useAuthHook();

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                // console.log('Sign out');
            })
            .catch(error => {
                // console.log(error.message);
            })
    }

    // theme controller
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const links = <>
        <div className='lg:flex items-center justify-center font-semibold gap-1'>
            {
                user ?
                    <>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/queries'>Queries</NavLink></li>
                        <li><NavLink to='/recommendationsForMe'>Recommendations For Me</NavLink></li>
                        <li><NavLink to='/myQueries'>MY Queries</NavLink></li>
                        <li><NavLink to='/myRecommendations'>My Recommendations</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                    </>
                    :
                    <>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/queries'>Queries</NavLink></li>
                        <li><NavLink to='/about'>About</NavLink></li>
                    </>
            }
        </div>
    </>
    // bg-[#27006f]
    return (
        <div className="navbar bg-primary text-white sticky top-0 z-50 md:px-10 lg:px-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-primary rounded-box z-[50] mt-3 w-56 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to='/' className="btn text-md md:text-xl">
                    <img className='w-7 md:w-10' src={websiteLogo} alt="" />
                    PerfectAlt
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {/* theme controller */}
                <label className="swap swap-rotate">
                    <input onChange={toggleTheme} type="checkbox" className="theme-controller" value="synthwave" />

                    <svg
                        className="swap-off h-7 w-7 md:w-10 md:h-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    <svg
                        className="swap-on h-7 w-7 md:w-10 md:h-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                {
                    user && user?.email ?
                        <div className='flex items-center gap-3'>
                            <div>
                                <img
                                    data-tooltip-id='my-tooltip'
                                    data-tooltip-content={user?.displayName}
                                    className='w-12 h-12 border border-black rounded-full'
                                    src={user?.photoURL}
                                    alt="User Avatar" />
                                <Tooltip id='my-tooltip'></Tooltip>
                            </div>
                            <button onClick={handleSignOut} className='btn btn-error text-black'>Logout</button>
                        </div> :
                        <div>
                            <Link className="btn btn-success text-white rounded-md shadow" to='/login'>Login</Link>
                        </div>
                }

            </div>
        </div>
    );
};

export default Navbar;