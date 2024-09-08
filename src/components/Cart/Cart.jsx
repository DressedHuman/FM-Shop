import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { CartContext } from "../Contexts";
import { api } from "../../apis";
import Cross2 from '../../assets/cross2.svg';

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    // fetching the products
    useEffect(() => {
        // fetching all products info
        api.get("/api/products/")
            .then(res => {
                setProducts(res.data);
                const _cartProducts = res.data.filter(product => cart.products.includes(product.id));
                setCartProducts(_cartProducts);
            })
    }, [])


    // remove from cart handler
    const removeFromCart = (productId) => {
        const product = products.find(product => product.id === productId);
        if (cart.products.includes(product.id)) {
            const _cartProducts = cartProducts.filter(cartProduct => !(cartProduct.id === product.id));
            setCartProducts(_cartProducts);
            setCart({
                totalProducts: cart.totalProducts - 1,
                products: cart.products.filter(product => !(product.id === productId)),
                totalPrice: cart.totalPrice - product.price,
            });
        }
    }


    return (
        <div className="px-24 pt-7">
            <Header />
            <div className="grid grid-cols-3 gap-12 py-20">
                <div className="col-span-2">
                    <h2 className="text-[#1E1E1E] text-[28px] font-semibold font-barlow space-y-7">An overview of your order</h2>
                    {
                        cartProducts.map((product, idx) => <div
                            key={idx}
                            className="relative p-7 shadow-lg"
                        >
                            <div className="flex justify-start items-start gap-4 pl-7 pt-7">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-[100px] aspect-square"
                                />
                                <p className="text-[#434343] font-bold font-barlow">{product.title}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="w-[15px] absolute top-0 right-0 -translate-x-[100%] translate-y-[100%]"
                            >
                                <img className="w-full" src={Cross2} alt="remove from cart" />
                            </button>
                            <p className="text-[#0E0E0E] text-[20px] font-semibold font-barlow absolute bottom-0 right-0">${product.price}</p>
                        </div>)
                    }
                </div>
                <div>
                    <h2 className="text-[#1E1E1E] text-[28px] font-semibold font-barlow space-y-7">Order details</h2>
                    <div className="px-7 pt-12 space-y-7">
                        <div>
                            <div className="flex justify-between items-center gap-7">
                                <p className="text-[#656565] text-[20px] font-barlow">Subtotal</p>
                                <p className="text-[#656565] text-[20px] font-medium font-barlow">${cart.totalPrice}</p>
                            </div>
                            <div className="flex justify-between items-center gap-7">
                                <p className="text-[#656565] text-[20px] font-barlow">Shippingl</p>
                                <p className="text-[#656565] text-[20px] font-medium font-barlow">Free</p>
                            </div>
                            <div className="flex justify-between items-center gap-7">
                                <p className="text-[#656565] text-[20px] font-barlow">Estimated Tax</p>
                                <p className="text-[#656565] text-[20px] font-medium font-barlow">$-</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-7">
                            <p className="text-[#656565] text-[24px] font-semibold font-barlow">Total</p>
                            <p className="text-[#0E0E0E] text-[24px] font-semibold font-barlow">{cart.totalPrice}</p>
                        </div>
                    </div>
                    <button
                        className="uppercase bg-black rounded-lg w-full text-white text-[17px] font-medium font-barlow py-3 px-7 mt-12"
                    >Go to checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;