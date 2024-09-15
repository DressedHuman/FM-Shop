import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { CartContext } from "../Contexts";
import { api } from "../../apis";
import FilterSection from "./FilterSection";

const Home = () => {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [showingProducts, setShowingProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // fetching the products
    useEffect(() => {
        // fetching all products info
        api.get("/api/products/")
            .then(res => {
                setProducts(res.data);
                setShowingProducts(res.data);
            })
    }, [])

    // fetching categories
    useEffect(() => {
        // fetching all categories names
        api.get("/api/categories/")
            .then(res => res.data)
            .then(setCategories)
            .catch(console.error);
    }, [])

    // sort products by category
    const sort = (category) => {
        if (category === "all") {
            return setShowingProducts(products);
        }

        const _products = products.filter(product => product.category === category);
        setShowingProducts(_products);
    }

    // add to cart handler
    const addToCart = (productId) => {
        const product = products.find(product => product.id === productId);
        setCart({
            totalProducts: cart.totalProducts + 1,
            products: [...cart.products, product.id],
            totalPrice: cart.totalPrice + product.price,
        });
    }

    // remove from cart handler
    const removeFromCart = (productId) => {
        const product = products.find(product => product.id === productId);
        if (cart.products.includes(product.id)) {
            setCart({
                totalProducts: cart.totalProducts - 1,
                products: cart.products.filter(product => !(product.id === productId)),
                totalPrice: cart.totalPrice - product.price,
            });
        }
    }

    return (
        <div className="px-7 md:px-12 lg:px-24 pt-2 md:pt-5 lg:pt-7">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 py-5 md:py-5">
                {/* filter section */}
                <FilterSection categories={categories} sort={sort} />

                {/* products section */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {
                        showingProducts.map(product => <Card
                            key={product.id}
                            productInfo={product}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                        />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;