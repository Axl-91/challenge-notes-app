import { useState } from "react";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/auth/login",
        { email: email, password: password },
        { withCredentials: true },
      );
      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.error)
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-200">
      <div className="shadow p-6 w-120 h-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
              required
            />
            {error && <span className="text-red-500 px-1 text-sm"> {error} </span>}
          </div>
          <div className="mb-2">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <div className="py-4">
            <button
              className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700 active:scale-95 transition-all duration-150 cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
