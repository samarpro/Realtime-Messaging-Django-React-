import React, { useEffect, useState } from "react";
import { Input, InputButton } from "../components";
import useEndpoints from "../context/endpoint";
import { Link, useNavigate } from "react-router-dom";
import { AuthHandler, LocalHasToken } from "./elements/fetchData";
import { auth, Facebookprovider, GoogleProvider } from "../firebase/firebase";
import {
    signInWithPopup,
    FacebookAuthProvider,
    GoogleAuthProvider,
} from "firebase/auth";
function Login() {
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        email: "",
        password: "",
    });
    // const [bio, setBio] = useState("");
    const { root_url } = useEndpoints();
    const navigate = useNavigate(); // provides a function through which we can easily change URL
    useEffect(() => {
        if (LocalHasToken()) navigate("/Dashboard");
    }, []);

    const OAuthHandler = (index) => {
        console.log('Running', index)
        const ProvidersList = [FacebookAuthProvider, GoogleAuthProvider];
        console.log(ProvidersList)
        signInWithPopup(auth, [Facebookprovider, GoogleProvider][index])
            .then(async (result) => {
                // The signed-in user info.
                const user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = ProvidersList[index].credentialFromResult(result);
                const accessToken = credential.accessToken;
                const token = await  AuthHandler(
                    'login',
                    {
                        username: user.displayName,
                        email: user.email,
                        image_url: user.photoURL,
                    },
                    root_url
                );
                console.log(result);
                if (token) navigate('/Dashboard')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                console.log(error);
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = ProvidersList[index].credentialFromError(error);
            });
    };

    return (

        <div
            id="loginForm"
            className="flex max-w-screen h-screen flex-wrap justify-center items-center"
        >
            <h1 className="text-4xl font-bold bg-gradient-to-r to-neutral-100 via-teal-300 from-blue-700 bg-clip-text text-transparent text-center">
                Let's dive again !
            </h1>
            <div className="left-container text-white w-1/2 bg-blue-700 bg bg-opacity-0 min-w-72">
                <form
                    className="form flex flex-col text-center"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log("Login/request sent");
                        // This is the function responsible for authentication+
                        let token = await AuthHandler(
                            "login",
                            { ...loginDetails },
                            root_url
                        );
                        if (typeof token === "string") {
                            navigate("/Dashboard")
                        }
                        else console.log("error to be raised.");
                    }}
                >
                    <Input
                        type="text"
                        value={loginDetails.username}
                        placeholder="Username"
                        onChange={(e) =>
                            setLoginDetails((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={loginDetails.email}
                        onChange={(e) =>
                            setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
                        }
                        required={true}
                    />
                    {/* <Input
                        type="text"
                        value={loginDetails.bio}
                        placeholder="Bio"
                        onChange={(e) => setLoginDetails((prev)=>({...prev,email:e.target.value})))}
                        required
                    /> */}
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={loginDetails.password}
                        onChange={(e) =>
                            setLoginDetails((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                        required
                    />
                    <InputButton type="submit" text="Log in" />
                    <InputButton
                        type="button"
                        value={0}
                        text="Log in with Facebook"
                        onClick={(e) => OAuthHandler(e.target.value)}
                    />

                    <InputButton
                        type="button"
                        value={1}
                        onClick={(e) => OAuthHandler(e.target.value)}
                        text="Log in with Google"
                        className="my-5 p-2 bg-white text-black font-bold border rounded-md"
                    />
                    <div>

                        <input type="checkbox" name="rememberMe" id="rememberMe" /><label htmlFor="rememberMe">

                            Remember me</label>
                    </div>
                </form>
            </div>
            <div className="right-container text-white w-1/2 bg-red-600 bg-opacity-0 min-w-72">
                <h1 className="text-3xl font-bold text-center">
                    Does it looks like this?
                </h1>
                <div className="profile-pic min-w-[100px] min-h-[100px] max-w-[101px] m-auto rounded-full bg-red-200"></div>
                <p className="text-center font-serif text-lg text-gray-400 ">
                    {loginDetails.username ? `@${loginDetails.username}` : "@username"}
                </p>
                <p className="text-center font-serif text-lg text-gray-400">
                    {loginDetails.email ? `${loginDetails.email}` : "your@sam.com"}
                </p>
            </div>
        </div>
    );
}

export default Login;
