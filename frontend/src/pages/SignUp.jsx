import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/auth/register",
        { name: name, email: email, password: password },
        { withCredentials: true },
      );
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center bg-gray-200">
      <div className="shadow p-6 w-150 bg-white">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@mail.com"
              required
            />
          </div>
          <div className="mb-4">
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

          <div className="mb-4">
            <button
              className="w-full bg-teal-600 text-white py-2 hover:bg-teal-700 active:scale-95 transition-all duration-150 cursor-pointer"
              type="submit"
            >
              Sign Up
            </button>

            <p className="text-center pt-2">
              Already have an account?
              <Link className="text-blue-600 pl-1 hover:underline" to="/signin">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
