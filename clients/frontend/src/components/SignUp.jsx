import React, { useEffect, useState } from "react";
import useEndpoints from "../context/endpoint";
import { Input } from "../components";
import { data } from "autoprefixer";
import { useNavigate } from 'react-router-dom'
import { AuthHandler, LocalHasToken } from "./elements/fetchData";

function SignUp() {
  const navigate = useNavigate()
  useEffect(() => {
    if (LocalHasToken())
      navigate('/Dashboard')
  }, [])

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPassEqual, setisPassEqual] = useState("Matched");
  const { root_url } = useEndpoints();

  const data = {
    email,
    username,
    password
  }


  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        console.log("User Creation is in process!")
        AuthHandler("Signups", data, root_url)
      }}>
        <h1>Email:</h1>
        <Input
          type="email"
          placeholder="Enter Email that makes sense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h1>Username:</h1>
        <Input
          type="text"
          placeholder="Enter Username that makes no sense"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <h1>Pass1:</h1>
        <Input
          type="password"
          placeholder="Enter password that makes more sense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <h1>Pass2:</h1>
        <Input
          type="password"
          placeholder="Enter password that makes more sense"
          onChange={(e) => {
            setisPassEqual("usMatched");
            if (e.target.value == password) setisPassEqual("Matched");
          }}
          required
        />
        <span>{isPassEqual}</span>

        <Input
          type="Submit"
          value="Submit"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </form>
    </>
  );
}

export default SignUp;
