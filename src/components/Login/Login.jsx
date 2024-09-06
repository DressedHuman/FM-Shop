import SideBar from "../SideBar/SideBar";
import { useState } from "react";

import Hide from '../../assets/hide.svg';
import Show from '../../assets/show.svg';
import { Link } from "react-router-dom";

const Login = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handlePasswordHiding = (e) => {
        e.preventDefault();
        document.querySelector("#password").type = isPasswordHidden ? "text" : "password";
        setIsPasswordHidden(!isPasswordHidden);
    }


    const handleSignIn = (e) => {
        e.preventDefault();
        const signInInfo = {
            email,
            password,
        }
        console.log(signInInfo);
    }


    return (
        <div className="grid grid-cols-2 min-h-[100vh]">
            <div className="px-24 py-44">
                <div>
                    <p className="text-black text-[32px] font-medium font-barlow">Welcome Back!</p>
                    <p className="text-[#707070] font-medium font-barlow">Enter your Credentials to access your account</p>

                    <form className="mt-7 space-y-8">
                        {/* input fields here */}
                        <div>
                            {/* email address field */}
                            <div className="pt-[2px] pb-[5px] rounded-lg">
                                <p>Email address</p>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full p-2 outline-none border focus:border-2 border-gray-500 focus:border-gray-700 mt-1 rounded-lg"
                                    autoFocus
                                />
                            </div>

                            {/* password field */}
                            <div className="pt-[2px] pb-[5px] rounded-lg">
                                <p>Password</p>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full p-2 outline-none border focus:border-2 border-gray-500 focus:border-gray-700 mt-1 rounded-lg"
                                    />
                                    <button
                                        onClick={handlePasswordHiding}
                                        className="absolute right-0 top-0 w-[24px] translate-y-[50%] -translate-x-[35%]"
                                    >
                                        <img src={isPasswordHidden ? Show : Hide} alt="hide password" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* sign in button */}
                        <button
                            className="w-full p-2 bg-black rounded-lg text-white font-barlow font-semibold text-[17px]"
                            onClick={handleSignIn}
                        >Sign In</button>
                    </form>

                    <p className="text-center text-black font-barlow font-medium my-2">or</p>

                    <p className="text-center text-sm text-black font-medium font-barlow">Don&apos;t have an account? <Link to={'/signup'} className="text-[blue]">Sign Up</Link></p>
                </div>
            </div>
            <SideBar />
        </div>
    );
};

export default Login;