import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Cart from "../../assets/cart.svg";
import Profile from '../../assets/profile.svg';

const PageLink = ({ name, path }) => {
    return <Link
        to={path}
        className='text-[#202020] text-lg font-semibold font-barlow'
    >
        {name}
    </Link>
}

const ErrorPage = () => {
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

    return (
        <div className="min-w-[100vw] min-h-[100vh] px-24 pt-7">
            <div className='flex justify-between items-center gap-4'>
                <div className='flex justify-center items-center gap-2'>
                    <img src={Logo} className='w-[40px]' alt="Logo of FurniFlex" />
                    <h2 className='text-black text-[24px] font-bold font-inter'>Furni<span className='text-[#1E99F5]'>Flex</span></h2>
                </div>
                <div className='flex justify-center items-center gap-4'>
                    {
                        links.map((link, idx) => <PageLink key={idx} name={link.name} path={link.path} />)
                    }
                </div>
                <div className='flex justify-center items-center gap-4'>
                    <Link
                        to={"/cart"}
                        className='relative'
                    >
                        <img className='w-[40px]' src={Cart} alt="cart icon" />
                    </Link>
                    <Link
                        to={'/profile'}
                    >
                        <img className='w-[40px]' src={Profile} alt="profile icon" />
                    </Link>
                </div>
            </div>
            <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center -z-10">
                <p className="text-3xl font-mono text-amber-700 font-bold">404 Not Found!</p>
            </div>
        </div>
    );
};

export default ErrorPage;