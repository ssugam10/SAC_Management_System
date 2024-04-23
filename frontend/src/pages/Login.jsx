import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin  = () => {
    const data = {
        email: email,
        password: password,
    };

    axios.post(`http://localhost:5555/api/auth/login`,data)
        .then((user) => {
            if(user.data){
              console.log("User successfully Logged in!");
              console.log(user.data);
              navigate('/');
            }    
            navigate('/login');
        })
        .catch(err => console.log(err));
  }

  return (
    <div className="p-8 h-screen bg-gray-200">
      <h1 className="text-3xl font-bold my-4 text-center">Login</h1>

      <div className="my-4 w-80">
        <label htmlFor="email" className="text-lg font-semibold text-gray-800">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="my-4 w-80">
        <label
          htmlFor="password"
          className="text-lg font-semibold text-gray-800"
        >
          Password
        </label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        className="mt-2 mb-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
