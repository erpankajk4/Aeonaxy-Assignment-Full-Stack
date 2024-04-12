import Navbar from "../common/Navbar";
import { IoIosMail } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuCamera } from "react-icons/lu";
import Logo from "../common/Logo";
import Footer from "../common/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EmailVer() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex items-center justify-between p-5 text-sm">  
      <div className="md:hidden"><Logo fillColor="#EA4B8B" /></div>
        <ul className="max-md:hidden flex gap-5 text-[#949399] font-bold">
          <li><Logo fillColor="#EA4B8B" /></li>
          <li>Inspiration</li>
          <li>Find Work</li>
          <li>Learn Design</li>
          <li>Go Pro</li>
          <li>Hire Designers</li>
        </ul>
        <ul className="flex items-center gap-5 text-[#949399]">
          <li className="max-md:hidden">
            <input type="text" placeholder="&#128269;  Search" />
          </li>
          <li>
            <LuCamera />
          </li>
          <li>
            <img className="rounded-full w-5 h-5" src={currentUser?.profilePicture} />
          </li>
          <li>
            <button className="max-md:hidden bg-[#EA4B8B] rounded-md text-white py-2 px-5 w-max font-bold" onClick={() =>  navigate("/profile")}>
              Upload
            </button>
          </li>
        </ul>
      </nav>
      <section className="md:h-screen flex-center flex-col p-5 gap-3">
        <h2 className="text-3xl font-bold">Please verify your email...</h2>
        <div className="relative w-min h-min">
          <IoIosMail className="text-8xl text-[#949399]" />
          <FaCheckCircle className="text-4xl text-[#EA4B8B] border-4 border-white bg-white rounded-full absolute left-[3.1rem] top-6 translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-[#949399]">
          Please verify your address. We've sent a confirmation email to
        </p>
        <p className="font-bold">{currentUser?.email}</p>
        <p className="text-[#949399]">
          Click the confirmation link in that email to begin using Dribble.
        </p>
        <p className="text-[#949399] text-center">
          Didn't receive it? Check your spam folder, it may have been caught by
          a filter. <br /> If you still don't see it, you can{" "}
          <Link className="text-[#EA4B8B] font-medium" to="#">
            resend the confirmation email
          </Link>
          .
        </p>
        <p>
          Wrong email address?{" "}
          <Link className="text-[#EA4B8B] font-medium" to="#">
            Change it.
          </Link>
        </p>
      </section>
    </>
  );
}
