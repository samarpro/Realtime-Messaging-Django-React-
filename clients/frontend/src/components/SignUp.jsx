import React, { useEffect, useRef, useState } from "react";
import useEndpoints from "../context/endpoint";
import { Input, InputButton } from "../components";
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
  const [isPassEqual, setisPassEqual] = useState(true);
  const { root_url } = useEndpoints();
  const rememberMe = useRef("dfjk")

  const data = {
    email,
    username,
    password
  }


  return (
    <div id="signups" className="flex justify-evenly flex-wrap items-center py-10 gap-20 max-h-screen">
      <h1 className="text-4xl font-bold bg-gradient-to-r to-neutral-100 via-teal-300 from-blue-700 bg-clip-text text-transparent text-center md:w-1/4">
        Dive into social media away from social media 🕸.
      </h1>
      <form className="w-1/2 min-w-72 h-fit" onSubmit={(e) => {
        e.preventDefault()
        console.log("User Creation is in process!")
        const token = AuthHandler("signup", data, root_url)
        console.log(token)
        if (typeof token == "string") navigate("/Dashboard")
        else console.log("errors to be raised.")
        if (rememberMe.current) localStorage.setItem('token',token)
      }}>
        <Input
          type="email"
          placeholder="Email 😎"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Username 🐱‍🏍"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password 🙈"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password again 😜"
          onChange={(e) => {
            if (e.target.value == password) setisPassEqual(true);
            else setisPassEqual(false);
          }}
          className={`${isPassEqual ? '' : 'border border-red-600'}`}
          required
        />
        <span className={`${isPassEqual ? 'hidden' : 'block'} bg-red-400 p-2 rounded border border-red-700`}>Password doesn't match.</span>
        
        <input type="checkbox" name="rememberMe" id="rememberMe" onChange={(e)=>{
          e.target.checked? rememberMe.current=true:rememberMe.current=false
        }}/>
        <label htmlFor="rememberMe" className="text-gray-400"> Remember me</label>
        <InputButton
          type="Submit"
          value="Submit"
          onChange={(e) => setPassword(e.target.value)}
          text="Submit"
          className="block"
          required
        />
      </form>
    </div>
  );
}

export default SignUp;
