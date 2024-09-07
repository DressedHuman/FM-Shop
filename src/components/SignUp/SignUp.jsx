import { useContext, useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import Hide from '../../assets/hide.svg';
import Show from '../../assets/show.svg';
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "../FormComponents/Checkboxes/Checkbox";
import { AuthContext } from "../Contexts";
import { api } from "../../apis";

const SignUp = () => {
    const { isAuthorized, isLoading, setIsLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAcceptedTOP, setIsAcceptedTOP] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);


    // redirect to the homepage if already authorized
    useEffect(() => {
        if (isAuthorized) {
            navigate("/");
        }
    })

    const handlePasswordHiding = (e) => {
        e.preventDefault();
        document.querySelector("#password").type = isPasswordHidden ? "text" : "password";
        setIsPasswordHidden(!isPasswordHidden);
    }


    const handleSignUp = async (e) => {
        e.preventDefault();
        const signUpInfo = {
            firstName,
            lastName,
            email,
            password,
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
            const res = await api.post("api/user/signup/", signUpInfo);
            if (res.status == 201) {
                setIsLoading(false);
                navigate("/login");
            }
            else {
                setErrorMessage("Error occurred");
                setIsLoading(false);
            }
        }
        catch (err) {
            setErrorMessage("Error occurred");
            setIsLoading(false);
            console.error(err);
        }

    }


    return (
        <div className="grid grid-cols-2 min-h-[100vh]">
            <div className="px-24 py-20">
                <div>
                    <div className="flex flex-col justify-center items-center gap-0">
                        <p className="text-black text-2xl font-semibold font-barlow">Welcome to</p>
                        <h2 className='text-black text-[40px] font-bold font-inter'>Furni<span className='text-[#1E99F5]'>Flex</span></h2>
                        <p className="font-barlow text-[#707070] font-medium">Signup for purchase your desire products</p>
                    </div>

                    <form
                        onSubmit={handleSignUp}
                        className="mt-7 space-y-7"
                    >
                        {/* input fields here */}
                        <div className="flex flex-col gap-[5px]">
                            {/* name fields here */}
                            <div className="grid grid-cols-2 gap-2">
                                {/* first name field */}
                                <div className="pt-[2px] pb-[5px] rounded-lg">
                                    <p>First Name <span className="text-gray-500">(<span className="text-amber-600">optional</span>)</span></p>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter your first name"
                                        className="w-full p-2 outline-none border focus:border-2 border-gray-500 focus:border-gray-700 mt-1 rounded-lg"
                                        autoFocus
                                    />
                                </div>

                                {/* last name field */}
                                <div className="pt-[2px] pb-[5px] rounded-lg">
                                    <p>Last Name <span className="text-gray-500">(<span className="text-amber-600">optional</span>)</span></p>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter your last name"
                                        className="w-full p-2 outline-none border focus:border-2 border-gray-500 focus:border-gray-700 mt-1 rounded-lg"
                                    />
                                </div>
                            </div>

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
                                errorMessage && <p className="text-[red] font-mono text-center mb-1">{errorMessage}</p>
                            }


                            {/* sign up button */}
                            <button
                                type="submit"
                                className={`w-full p-2 ${isAcceptedTOP ? "bg-black" : "bg-[gray]"} rounded-lg text-white font-barlow font-semibold text-[17px]`}
                                disabled={!isAcceptedTOP}
                            >Sign Up</button>
                        </div>
                    </form>

                    <p className="text-center text-black font-barlow font-medium my-2">or</p>

                    <p className="text-center text-sm text-black font-medium font-barlow">Already have an account? <Link to={'/login'} className="text-[blue]">Sign In</Link></p>
                </div>
            </div>
            <SideBar />
        </div>
    );
};

export default SignUp;