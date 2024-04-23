import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        const data = {
            email: email,
            password: password,
            name: name,
        };

        axios
            .post(`http://localhost:5555/api/auth/register`, data)
            .then((user) => {
                if (user) console.log("User successfully registered!");
                navigate("/login");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex justify-center h-screen items-center">
            <div className="p-20 rounded-md  bg-gray-200">
                <h1 className="text-3xl font-bold my-4 text-center">Signup</h1>

                <div className="my-4 w-80">
                    <label
                        htmlFor="name"
                        className="text-lg font-semibold text-gray-800"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="my-4 w-80">
                    <label
                        htmlFor="email"
                        className="text-lg font-semibold text-gray-800"
                    >
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    className="mt-2 mb-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;
