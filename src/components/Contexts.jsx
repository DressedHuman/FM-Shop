import { createContext, useEffect, useState } from "react";
import Loader from "./Loader/Loader";
import { test_token } from "../apis";

export const AuthContext = createContext(null);
export const CartContext = createContext(null);

const Contexts = ({ children }) => {
    // AuthContext states
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // CartContext states
    const [cart, setCart] = useState({
        totalProducts: 0,
        products: [],
        totalPrice: 0,
    });

    const authContextValue = {
        isAuthorized,
        setIsAuthorized,
        isLoading,
        setIsLoading,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
    }

    const cartContextValue = {
        cart,
        setCart,
    }

    // effect the auth function to check if the user is authorized or not
    useEffect(() => {
        // set isLoading to true until the token validation finishes
        setIsLoading(true);


        const token = localStorage.getItem("token");
        if (token) {
            test_token(token)
                .then(res => {
                    if (!res) {
                        // the token is invalid, so clearing the localStorage
                        localStorage.clear();
                    }
                    else {
                        const user = JSON.parse(localStorage.getItem("user"));
                        setFirstName(user.first_name);
                        setLastName(user.last_name);
                        setEmail(user.email);
                    }

                    setIsAuthorized(res);
                    setIsLoading(false);
                });
        }
        else {
            setIsAuthorized(false);
            setIsLoading(false);

            setFirstName("");
            setLastName("");
            setEmail("");

            // there is no token, clearing the localStorage
            localStorage.clear();
        }
    }, [])

    // return loader if it's loading, otherwise children
    return <AuthContext.Provider value={authContextValue}>
        <CartContext.Provider value={cartContextValue}>
            <div className="relative">
                {
                    isLoading && <div className="absolute top-0 bottom-0 left-0 right-0 z-[9999]">
                        <Loader />
                    </div>
                }
                {children}
            </div>
        </CartContext.Provider>
    </AuthContext.Provider>
};

export default Contexts;