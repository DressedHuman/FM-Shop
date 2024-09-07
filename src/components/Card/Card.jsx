import PropTypes from 'prop-types';
import Cart2 from '../../assets/cart2.svg';

const Card = ({productInfo}) => {
    return (
        <div className='p-3 flex flex-col rounded-lg shadow-lg'>
            <img className='w-full aspect-square object-contain' src={productInfo.image} alt={productInfo.title} />
            <h2 className='text-lg text-[#343434] font-barlow font-semibold my-4'>{productInfo.title.length>42 ? productInfo.title.slice(0, 42) : productInfo.title}</h2>
            <h2 className='text-lg text-[#343434] font-barlow font-bold'>${productInfo.price}</h2>
            <p className='text-[#838383] text-sm font-barlow flex-grow mt-4 mb-7'>{productInfo.description.length>115 ? productInfo.description.slice(0, 115) : productInfo.description}</p>
            <button className='bg-[#202020] text-white font-barlow font-semibold flex justify-center items-center gap-3 w-full p-2 rounded-lg'>
                <img className='w-[20px]' src={Cart2} alt="cart2 icon" />
                <span>Add to cart</span>
            </button>
        </div>
    );
};

Card.propTypes = {
    productInfo: PropTypes.object,
}

export default Card;