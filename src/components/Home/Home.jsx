import axios from "axios";
import Header from "../Header/Header";
import { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { CartContext } from "../Contexts";
import { api } from "../../apis";

const Home = () => {
    const { cart, setCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [showingProducts, setShowingProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

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
        setSelectedCategory(category);
        const _products = products.filter(product => product.category===category);
        setShowingProducts(_products);
    }

    return (
        <div className="px-24 pt-7">
            <Header />
            <div className="grid grid-cols-4 gap-12 pt-20">
                <div className="min-h-max flex flex-col justify-start items-center gap-2">
                    {
                        categories.map((category, idx) => <button
                            onClick={() => sort(category)}
                            key={idx}
                            className={`w-full text-start ${selectedCategory===category ? "bg-black text-white" : "bg-white text-[#717171]"} font-semibold text-[22px] rounded-lg px-4 py-2`}
                        >
                            {category}
                        </button>)
                    }
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-4">
                    {
                        showingProducts.map(product => <Card key={product.id} productInfo={product} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;