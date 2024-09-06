import Logo from '../../assets/logo.svg';

const SideBar = () => {
    return (
        <div
            className="bg-black flex flex-col justify-center items-center"
        >
            <img src={Logo} className='w-[89px]' alt="Logo of FurniFlex" />
            <h2 className='text-white text-[40px] font-bold font-inter'>Furni<span className='text-[#1E99F5]'>Flex</span></h2>
            <p className='font-medium text-[#C8C4C4] w-[70%]'>Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.</p>
        </div>
    );
};

export default SideBar;