import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AsideBanner from "./components/AsideBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Fields can't be Empty"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/profile");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
    {currentUser && <Navigate to="/profile" replace={true}></Navigate>}
    <section className="w-full md:grid grid-cols-12">
      <AsideBanner />
      <main className="md:col-span-8 p-5">
        <p className="text-right">
          Not a member yet?{" "}
          <Link className="text-[#4D3EA3]" to="/sign-up">
            Sign Up
          </Link>
        </p>
        <div className="w-full flex gap-y-5 justify-center p-10">
          <div className="max-w-[550px] p-5 flex flex-col gap-y-9">
            <h1 className="text-2xl font-bold">Sign in to Dribble</h1>
            {/* Error  */}

            {errorMessage && (
              <li className="list-disc text-red-500">
                {errorMessage}
              </li>
            )}
            {/* Sign In Form  */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>{" "}
                <input
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>{" "}
                <input
                  type="password"
                  placeholder="6+ characters"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <button
                className="bg-[#EA4B8B] rounded-md text-white py-2 px-10 w-max font-bold"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <p className="text-[#B3B3B2] text-sm">
              This site is protected by reCAPTCHA and the Google <br />
              <Link className="text-[#4D3EA3]" to="#">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="text-[#4D3EA3]" to="#">
                Terms of Service
              </Link>{" "}
              apply.
            </p>
          </div>
        </div>
      </main>
    </section>
    </>
  );
}
