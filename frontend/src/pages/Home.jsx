import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex-1 items-center text-center">
      <h1 className="py-5 mb-6 text-3xl font-extrabold md:text-5xl lg:text-6xl">
        Store Your Notes, Share Your Wisdom
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
        At NotesApp Inc. we believe your ideas can inspire the world.
        Capture your thoughts effortlessly and share them with a vibrant community.
      </p>
      <p className="mb-6 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
        Join us today to connect with fellow thinkers and showcase your creativity.
      </p>

      <div className="flex justify-center space-x-4 mb-6">
        <Link to="/signup">
          <button
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </Link>
        <Link to="/signin">
          <button
            className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </Link>
      </div>

      <p className="text-md font-medium text-gray-400">
        Your ideas matter. Let’s share them with the world!
      </p>
    </div>
  );
};

export default Home;
