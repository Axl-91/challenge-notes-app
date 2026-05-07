import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });

      navigate('/');
      window.location.reload();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header className="bg-blue-700 border-b-2 border-blue-800 shadow-xl">
      <nav className="flex justify-between items-center px-5 py-3">
        <Link to="/" className="text-xl font-bold text-white hover:underline">
          Notes App
        </Link>
        <div className="space-x-2">
          {user ?
            <>
              <button
                onClick={() => { handleLogout() }}
                className="bg-white text-blue-900 px-4 py-2 cursor-pointer rounded hover:bg-blue-100 active:scale-95 transition-all">
                Logout
              </button>
            </>
            :
            <>
              <button
                onClick={() => { navigate("/signup") }}
                className="bg-white text-blue-900 px-4 py-2 cursor-pointer rounded hover:bg-blue-100 active:scale-95 transition-all">
                Sign Up
              </button>
              <button
                onClick={() => { navigate("/signin") }}
                className="bg-white text-blue-900 px-4 py-2 cursor-pointer rounded hover:bg-blue-100 active:scale-95 transition-all">
                Login
              </button>
            </>

          }

        </div>
      </nav>
    </header>
  )
}

export default Header;
