import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import img1 from "../assets/img/p1.png";
import img2 from "../assets/img/p2.png";
import img3 from "../assets/img/p3.png";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function LookingFor() {
  const { currentUser, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    lookingFor: [],
  });
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectionContent = [
    {
      img: img1,
      title: "I'm a designer looking to share my work",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur.",
    },
    {
      img: img2,
      title: "I'm looking to hire a designer",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur.",
    },
    {
      img: img3,
      title: "I'm looking for design inspiration",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  const handleChange = (e, title) => {
    const { checked } = e.target;

    if (checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        lookingFor: [...prevFormData.lookingFor, title],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        lookingFor: prevFormData.lookingFor.filter((item) => item !== title),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        navigate("/email-verification");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-5">What brings you to Dribble?</h1>
        <p className="text-[#949399] mb-[8rem]">
          Select the options that best describe you. Don't worry, you can
          explore other options later.
        </p>
        {/* Errors  */}
        {updateUserSuccess && (
          <li className="list-disc text-green-500">{updateUserSuccess}</li>
        )}
        {updateUserError && (
          <li className="list-disc text-red-500">{updateUserError}</li>
        )}
        <div className="md:flex-center gap-5 transition-all duration-300">
          {selectionContent.map((c, i) => (
            <div
              className="mb-10 w-[250px] h-[250px] group flex-col gap-3 border border-[#B3B3B2] hover:border-[#EA4B8B] hover:border-2 rounded-lg p-3 flex-center transition-all duration-300"
              key={i}
            >
              <img
                src={c.img}
                alt={c.title}
                className="h-[90px] transition-all duration-300"
              />
              <h2 className="text-black font-bold transition-all duration-300">
                {c.title}
              </h2>
              <p className="hidden group-hover:block text-[#949399] transition-all duration-300">
                {c.content}
              </p>
              <input
                type="checkbox"
                className="group-hover:block group-hover:mb-[100px] rounded-full bg-[#949399] text-white transition-all duration-300"
                onChange={(e) => handleChange(e, c.title)}
              />
            </div>
          ))}
        </div>
        <p className="font-bold py-5">
          Anything else? You can select multiple.
        </p>
        <button
          className="bg-[#EA4B8B] rounded-md text-white py-2 px-10 w-max font-bold"
          type="button"
          onClick={(e) => handleSubmit(e)}
          disabled={loading}
        >
          {loading ? <span className="pl-3">Loading...</span> : "Finish"}
        </button>
        <p className="text-[#949399] font-bold py-5">or Press RETURN</p>
      </section>
    </>
  );
}
