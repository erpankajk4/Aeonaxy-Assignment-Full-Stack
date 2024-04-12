import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AsideBanner from "./components/AsideBanner";
import { useSelector } from "react-redux";

export default function SignUp() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "check") {
      // Handle checkbox change separately
      setAgreedToTerms(e.target.checked);
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !agreedToTerms
    ) {
      setErrorMessage(["Please fill out all fields and agree to terms."]); // Update error message
      return;
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const dataToSend = { ...formData, agreedToTerms };
      console.log(dataToSend);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrorMessage([error.message]);
      setLoading(false);
    }
  };

  return (
    <>
    {currentUser && <Navigate to="/profile" replace={true}></Navigate>}
    <section className="w-full md:grid grid-cols-12">
      <AsideBanner />
      <main className="md:col-span-8 p-5">
        <p className="text-right">
          Already a member?{" "}
          <Link className="text-[#4D3EA3]" to="/">
            Sign In
          </Link>
        </p>
        <div className="w-full flex gap-y-5 justify-center">
          <div className="max-w-[550px] p-5 flex flex-col gap-y-9">
            <h1 className="text-2xl font-bold">Sign up to Dribble</h1>
            {/* Error  */}
            {errorMessage &&
              errorMessage.map((e, i) => {
                return (
                  <li className="list-disc text-red-500" key={i}>
                    {e}
                  </li>
                );
              })}
            {/* Sign Up Form  */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label htmlFor="name">Name</label>{" "}
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label htmlFor="username">Username</label>{" "}
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>{" "}
                <input
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>{" "}
                <input
                  type="password"
                  placeholder="6+ characters"
                  id="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-2">
                <input
                  className="mb-6"
                  type="checkbox"
                  id="check"
                  onChange={handleChange}
                  required
                />
                <p className="text-[#949399]">
                  Creating an account means you're okay with our{" "}
                  <Link className="text-[#4D3EA3]" to="#">
                    Terms of Service, Privacy Policy
                  </Link>
                  , and our default{" "}
                  <Link className="text-[#4D3EA3]" to="#">
                    Notification Settings.
                  </Link>
                </p>
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
                  "Create Account"
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
