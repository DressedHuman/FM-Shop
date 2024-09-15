import PropTypes from 'prop-types';
import Cart2 from '../../assets/cart2.svg';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Contexts';

const Card = ({ productInfo, addToCart, removeFromCart }) => {
    const { cart } = useContext(CartContext);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        setAddedToCart(true);
        addToCart(productInfo.id);
    }

    const handleRemoveFromCart = () => {
        setAddedToCart(false);
        removeFromCart(productInfo.id);
    }


    // initial checking if added or not
    useEffect(() => {
        setAddedToCart(cart.products.includes(productInfo.id));
    }, [])

    return (
        <div className='p-3 flex flex-col rounded-lg shadow-lg hover:scale-105 duration-150'>
            <img className='w-full aspect-square object-contain' src={productInfo.image} alt={productInfo.title} />
            <h2 className='text-lg text-[#343434] font-barlow font-semibold mt-4 mb-1'>{productInfo.title.length > 42 ? productInfo.title.slice(0, 42) : productInfo.title}</h2>
            <h2 className='text-lg text-[#343434] font-barlow font-bold'>${productInfo.price}</h2>
            <p className='text-[#838383] text-sm font-barlow flex-grow mt-1 mb-4'>{productInfo.description.length > 115 ? productInfo.description.slice(0, 115) : productInfo.description}</p>

            {
                addedToCart ?
                    <button
                        onClick={handleRemoveFromCart}
                        className='bg-[green] text-white font-barlow font-semibold flex justify-center items-center gap-3 w-full p-2 rounded-lg'
                    >
                        <img className='w-[20px]' src={Cart2} alt="cart2 icon" />
                        <span>Remove from cart</span>
                    </button>
                    :
                    <button
                        onClick={handleAddToCart}
                        className='bg-[#202020] text-white font-barlow font-semibold flex justify-center items-center gap-3 w-full p-2 rounded-lg'
                    >
                        <img className='w-[20px]' src={Cart2} alt="cart2 icon" />
                        <span>Add to cart</span>
                    </button>
            }
        </div>
    );
};

Card.propTypes = {
    productInfo: PropTypes.object,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
}

export default Card;