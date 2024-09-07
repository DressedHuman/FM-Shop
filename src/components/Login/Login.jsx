import SideBar from "../SideBar/SideBar";
import { useContext, useEffect, useState } from "react";
import Hide from '../../assets/hide.svg';
import Show from '../../assets/show.svg';
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../FormComponents/Checkboxes/Checkbox";
import { api } from "../../apis";
import { AuthContext } from "../Contexts";

const Login = () => {
    const { isAuthorized, setIsAuthorized, isLoading, setIsLoading, setFirstName, setLastName, setEmail } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [email, setEmailField] = useState("");
    const [password, setPassword] = useState("");
    const [isAcceptedTOP, setIsAcceptedTOP] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handlePasswordHiding = (e) => {
        e.preventDefault();
        document.querySelector("#password").type = isPasswordHidden ? "text" : "password";
        setIsPasswordHidden(!isPasswordHidden);
    }

    useEffect(() => {
        if (isAuthorized) {
            navigate("/");
        }
    })

    // signin function
    const handleSignIn = async (e) => {
        e.preventDefault();
        const signInInfo = {
            email,
            password,
        }
        // setting the loader
        setIsLoading(true);
        setErrorMessage("");

        try {
            const res = await api.post("api/user/login/", signInInfo);
            if (res.status == 200) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                setFirstName(res.data.user.first_name);
                setLastName(res.data.user.last_name);
                setEmail(res.data.user.email);

                setIsLoading(false);
                setIsAuthorized(true);
            }
        }
        catch (err) {
            setErrorMessage("Wrong Credentials Given");
            setIsLoading(false);
            console.error(err);
        }
    }


    return (
        <div className="grid grid-cols-2 min-h-[100vh]">
            <div className="px-24 py-32">
                <div>
                    <p className="text-black text-[32px] font-medium font-barlow">Welcome Back!</p>
                    <p className="text-[#707070] font-medium font-barlow">Enter your Credentials to access your account</p>

                    <form
                        onSubmit={handleSignIn}
                        className="mt-7 space-y-7"
                    >
                        {/* input fields here */}
                        <div className="flex flex-col gap-[5px]">
                            {/* email address field */}
                            <div className="pt-[2px] pb-[5px] rounded-lg">
                                <p>Email address</p>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => setEmailField(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full p-2 outline-none border focus:border-2 border-gray-500 focus:border-gray-700 mt-1 rounded-lg"
                                    autoFocus
                                    required
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
                                        required
                                    />
                                    <button
                                        onClick={handlePasswordHiding}
                                        className="absolute right-0 top-0 w-[24px] translate-y-[50%] -translate-x-[35%]"
                                    >
                                        <img src={isPasswordHidden ? Show : Hide} alt="hide password" />
                                    </button>
                                </div>
                            </div>

                            {/* terms and policy accepting checkbox */}
                            <div className="flex gap-2">
                                <div className="my-auto">
                                    <Checkbox onChange={() => setIsAcceptedTOP(!isAcceptedTOP)} showCross={false} size="small" />
                                </div>
                                <p className="text-black text-sm font-medium font-barlow">I agree to the <span className="underline">Terms & Policy</span></p>
                            </div>
                        </div>


                        <div>
                            {/* error message here */}
                            {
                                errorMessage && <p className="text-red-700 font-mono text-center mb-1">{errorMessage}</p>
                            }

                            {/* sign in button */}
                            <button
                                type="submit"
                                className={`w-full p-2 ${isAcceptedTOP ? "bg-black" : "bg-[gray]"} rounded-lg text-white font-barlow font-semibold text-[17px]`}
                                disabled={!isAcceptedTOP}
                            >Sign In</button>
                        </div>
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