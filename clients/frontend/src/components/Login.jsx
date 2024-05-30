import React, { useEffect, useState } from "react";
import { Input } from "../components";
import useEndpoints from "../context/endpoint";
import { useNavigate } from "react-router-dom";
import {AuthHandler, LocalHasToken} from "./elements/fetchData";
function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const { root_url, root_user } = useEndpoints();
    const navigate = useNavigate() // provides a function through which we can easily change URL
    useEffect(()=>{
        if (LocalHasToken())
            navigate('/Dashboard')
    },[])

    return (
        <div className="flex w-screen h-screen">
            <div className="left-container text-white w-1/2">
                <h1>SamChats</h1>
                <form
                    className="form flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault()
                        console.log("Login/request sent")
                        // This is the function responsible for authentication2
                        AuthHandler("login",{email,password},root_url)
                        navigate('/Dashboard')
                    }
                }
                >
                    <div className="profile-selector w-32 h-32 bg-slate-500 rounded-full">
                        dgfhsgfh
                    </div>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <Input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        value={bio}
                        placeholder="Bio"
                        onChange={(e) => setBio(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input type="submit" value="Submit" className="w-max p-4 bg-white" />
                </form>
            </div>
            <div className="right-container text-white w-1/2">
                <div className="profile-pic"></div>
                <h1>Email: {email}</h1>
                <h1>Username: {username}</h1>
                <h1>Bio: {bio}</h1>
                <h2>Password: {password}</h2>
            </div>
        </div>
    );
}

export default Login;
