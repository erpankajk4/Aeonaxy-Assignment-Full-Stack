import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EmailVer from "./pages/EmailVer";
import LookingFor from "./pages/LookingFor";
import Footer from "./common/Footer";
import PrivateRoute from "./common/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route element={<PrivateRoute />}>
      <Route path="/profile" element={<Profile />} />
      <Route path="/looking-for" element={<LookingFor />} />
      <Route path="/email-verification" element={<EmailVer />} />
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
  )
}
