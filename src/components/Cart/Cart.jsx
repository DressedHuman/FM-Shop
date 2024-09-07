import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { CartContext } from "../Contexts";
import { api } from "../../apis";

const Cart = () => {
    const { cart } = useContext(CartContext);
    const [products, setProducts] = useState([]);

    // fetching the products
    useEffect(() => {
        // fetching all products info
        api.get("/api/products/")
            .then(res => {
                setProducts(res.data);
            })
    }, [])


    return (
        <div className="px-24 pt-7">
            <Header />
            <div className="grid grid-cols-3 gap-12 pt-20">
                <div className="col-span-2">
                    <h2 className="text-[#1E1E1E] text-[28px] font-semibold font-barlow space-y-7">An overview of your order</h2>
                    {
                        products.filter(product => cart.products.includes(product.id)).map((product, idx) => <div
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
                            <p className="text-[#0E0E0E] text-[20px] font-semibold font-barlow absolute bottom-0 right-0">${product.price}</p>
                        </div>)
                    }
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Cart;