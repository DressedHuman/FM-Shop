import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import Cart from '../../assets/cart.svg';
import Profile from '../../assets/profile.svg';
import { useContext } from 'react';
import { CartContext } from '../Contexts';

const PageLink = ({ name, path }) => {
    return <Link
        to={path}
        className='text-[#202020] text-lg font-semibold font-barlow'
    >
        {name}
    </Link>
}

const Header = () => {
    const { cart } = useContext(CartContext);
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
                    {
                        cart.totalProducts>0 && <div className='bg-black text-white text-sm font-bold font-mono p-[1px] rounded-[50%] w-[20px] aspect-square text-center absolute bottom-0 right-0 translate-x-[30%] translate-y-[30%]'>{cart.totalProducts}</div>
                    }
                </Link>
                <Link
                    to={'/profile'}
                >
                    <img className='w-[40px]' src={Profile} alt="profile icon" />
                </Link>
            </div>
        </div>
    );
};

export default Header;