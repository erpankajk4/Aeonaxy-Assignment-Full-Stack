import Navbar from "../common/Navbar";
import { LuCamera } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({
    location: currentUser.location || "",
  });
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dd2yrwwo3");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd2yrwwo3/image/upload",
        {
          method: "POST",
          body: data,
          // Set up an upload progress function
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setImageFileUploadProgress(progress);
          },
        }
      );

      const cloudData = await res.json();
      setImageFileUrl(cloudData.url);
      setFormData({ ...formData, profilePicture: cloudData.url });
      setImageFileUploadProgress(100);
      setImageFileUploading(false);
    } catch (error) {
      setImageFileUploadError(error.message);
      setImageFileUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Update User
  const handleNext = async (e) => {
    // console.log(formData);
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      console.log("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
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
        navigate("/looking-for");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="grid place-items-center p-5">
        <div>
          <h1 className="text-3xl font-bold mb-5">
            Welcome! Let's create your profile
          </h1>
          <p className="text-[#949399] mb-10">
            Let others get to know you better! You can do these later
          </p>
          {/* Errors  */}
          {updateUserSuccess && (
            <li className="list-disc text-green-500">{updateUserSuccess}</li>
          )}
          {updateUserError && (
            <li className="list-disc text-red-500">{updateUserError}</li>
          )}
          {error && <li className="list-disc text-red-500">{error}</li>}

          <h2 className="text-xl font-bold mb-5">Add an avatar</h2>
          <div className="md:flex gap-10 items-center mb-16">
            <div>
              {/* Avatar Upload  */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={filePickerRef}
                hidden
              />
              <div
                className="relative w-[10rem] h-[10rem] rounded-full border-4 border-dotted flex-center cursor-pointer"
                onClick={() => filePickerRef.current.click()}
              >
                {imageFileUploadProgress !== 100 && (
                  <CircularProgressbar
                    value={imageFileUploadProgress}
                    text={`${imageFileUploadProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageFileUploadProgress / 100
                        })`,
                      },
                    }}
                  />
                )}
                <img
                  src={imageFileUrl || currentUser.profilePicture}
                  alt="avatar"
                  className={`rounded-full w-full h-full object-cover ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    "opacity-60"
                  }`}
                />
                <LuCamera className="absolute top-[42%] right-[42%]  rounded-full p-1 text-3xl text-[#949399]" />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <button
                className="mt-5 text-black font-bold border border-[#B3B3B2] rounded-md py-2 px-5 w-max"
                onClick={() => filePickerRef.current.click()}
              >
                Choose image
              </button>
              <p className="text-[#949399] font-medium">
                {`>`} Or choose one of our defaults
              </p>
            </div>
          </div>
          {imageFileUploadError && (
            <div className="text-red-500">{imageFileUploadError}</div>
          )}
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold mb-5">Add your location</h2>
            <input
              id="location"
              className="border-b border-[#949399] mb-10 bg-white"
              type="text"
              placeholder="Enter a location"
              onChange={handleChange}
              value={formData.location}
            />
            <button
              className="bg-[#EA4B8B] rounded-md text-white py-2 px-10 w-max font-bold"
              type="button"
              onClick={(e) => handleNext(e)}
              disabled={loading || imageFileUploading}
            >
              {loading || imageFileUploading ? (
                <span className="pl-3">Loading/ Upload...</span>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
