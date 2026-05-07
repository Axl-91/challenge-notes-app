import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";
import axios from "axios";
import UserNotes from "./pages/UserNotes";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return;

  return (
    <BrowserRouter>
      <main className="flex flex-col h-screen">
        <Header user={user} />
        <Routes>
          <Route path="/" element={user ? <UserNotes user={user} /> : <Home />}></Route>
          <Route path="/signup" element={user ? <Navigate to={"/"} /> : <SignUp />}></Route>
          <Route path="/signin" element={user ? <Navigate to={"/"} /> : <SignIn />}></Route>
        </Routes>
      </main>
    </BrowserRouter >
  );
}

export default App;
