import Logo from "./Logo";
import {  useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
export default function Navbar() {
  const dispatch = useDispatch();
  // SignOut User
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header className="w-full p-5">
      <nav className="flex items-center justify-between">
        <Logo fillColor="#EA4B8B" />
        <button
          className="text-black font-bold border border-[#B3B3B2] rounded-md py-2 px-5 w-max"
          onClick={handleSignout}
        >
          SignOut
        </button>
      </nav>
    </header>
  );
}
