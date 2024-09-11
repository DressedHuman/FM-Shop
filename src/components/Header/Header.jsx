import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.svg';
import Cart from '../../assets/cart.svg';
import Profile from '../../assets/profile.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../Contexts';

const PageLink = ({ name, path }) => {
    return <NavLink
        to={path}
        className={({ isActive, isPending }) => isActive ? "text-blue-700 md:p-0 dark:border-gray-700 block py-2 px-3 rounded" : isPending ? "" : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 block py-2 px-3 rounded"}
    >
        {name}
    </NavLink>
}

const Header = () => {
    const { cart } = useContext(CartContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Products",
            path: "/products",
        },
        {
            name: "Categories",
            path: "/categories",
        },
        {
            name: "Blog",
            path: "/blog",
        },
    ]

    // handler for toggling mobile menu
    const toggleOpenClose = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }


    // dynamically adding padding to the body
    useEffect(() => {
        const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
        document.body.style.paddingTop = `${navbarHeight}px`;

        return () => {
            document.body.style.paddingTop = "0px";
        }
    }, []);

    return (
        <nav ref={navbarRef} className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            {/* initial interface */}
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* left section */}
                <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-8" alt="FurniFlex" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Furni<span className='text-[#1E99F5]'>Flex</span></span>
                </Link>

                {/* right section */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {/* cart and profile section */}
                    <div className='flex justify-center items-center gap-4'>
                        <Link
                            to={"/cart"}
                            className='relative'
                        >
                            <img className='w-7' src={Cart} alt="cart icon" />
                            {
                                cart.totalProducts > 0 && <div className='bg-white text-black text-sm font-bold font-mono p-[1px] rounded-[50%] w-[20px] aspect-square text-center absolute bottom-0 right-0 translate-x-[30%] translate-y-[30%]'>{cart.totalProducts}</div>
                            }
                        </Link>
                        <Link
                            to={'/profile'}
                        >
                            <img className='w-8' src={Profile} alt="profile icon" />
                        </Link>
                    </div>

                    {/* page links */}
                    <button
                        onClick={toggleOpenClose}
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                {/* middle section (for tablet or larger devices only) */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            links.map((link, idx) => <li key={idx}>
                                <PageLink name={link.name} path={link.path} />
                            </li>)
                        }
                    </ul>
                </div>
            </div>

            {/* menu options (for mobile devices only) */}
            <div className={`${isMobileMenuOpen ? "" : "hidden"} items-center justify-between w-full md:hidden`} id="navbar-sticky">
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {
                        links.map((link, idx) => <li
                            key={idx}
                            onClick={toggleOpenClose}
                        >
                            <NavLink
                                to={link.path}
                                className={({ isActive, isPending }) => isActive ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" : isPending ? "" : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}
                            >
                                {link.name}
                            </NavLink>
                        </li>)
                    }
                </ul>
            </div>
        </nav>

    )
};


PageLink.propTypes = {
    name: PropTypes.string,
    path: PropTypes.string,
}

export default Header;