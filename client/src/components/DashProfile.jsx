import { Button, TextInput, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice.js";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentUser.profilePicture);
  const [updateStatus, setUpdateStatus] = useState({
    error: null,
    loading: false,
  });
  const [openModal, setOpenModal] = useState(false);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setUpdateStatus({
          error: "Image size should be less than 2MB",
          loading: false,
        });
        return;
      }
      console.log(file);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setUpdateStatus({ error: null, loading: false });
    }
  };

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setUpdateStatus({ error: null, loading: false });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus({ error: null, loading: true });

    console.log(imageFile);
    // Validate if any changes were made
    if (
      !imageFile &&
      formData.username === currentUser.username &&
      formData.email === currentUser.email &&
      !formData.password
    ) {
      setUpdateStatus({
        error: "Please make at least one change to update",
        loading: false,
      });
      return;
    }

    try {
      dispatch(updateUserStart());

      // Create FormData object
      const formDataToSend = new FormData();

      // Only append changed fields
      if (formData.username !== currentUser.username) {
        formDataToSend.append("username", formData.username);
      }
      if (formData.email !== currentUser.email) {
        formDataToSend.append("email", formData.email);
      }
      if (formData.password) {
        formDataToSend.append("password", formData.password);
      }
      if (imageFile) {
        formDataToSend.append("profilePicture", imageFile);
      }

      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        setUpdateStatus({ error: data.message, loading: false });
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateStatus({ error: null, loading: false });

        // Reset password field and image file
        setFormData((prev) => ({ ...prev, password: "" }));
        setImageFile(null);

        // Show success message
        alert("Profile updated successfully!");
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateStatus({
        error: "An error occurred while updating profile",
        loading: false,
      });
    }
  };

  const handleDeleteUser = async () => {
    setOpenModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/signout", {
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
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-extrabold text-2xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
          className="hidden"
        />
        {/* Image preview */}
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full hover:opacity-80 transition-opacity"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={imagePreview}
            alt="profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all">
            <span className="text-white opacity-0 hover:opacity-100">
              Change
            </span>
          </div>
        </div>
        {/* Form fields */}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="New Password"
          onChange={handleChange}
          value={formData.password}
        />
        {/* Error message */}
        {updateStatus.error && (
          <div className="text-red-500 text-sm">{updateStatus.error}</div>
        )}
        {/* Submit button */}
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={updateStatus.loading}
        >
          {updateStatus.loading ? "Updating..." : "Update Profile"}
        </Button>
        {/* Create Post buuton for admin*/}
        {currentUser.isAdmin && (
          <Link to="/create-post">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>

      {/* Additional actions */}
      <div className="text-orange-600 flex justify-between mt-4">
        <span
          onClick={() => setOpenModal(true)}
          className="cursor-pointer text-sm font-semibold"
        >
          Delete Account
        </span>
        <span
          onClick={handleLogout}
          className="cursor-pointer text-sm font-semibold"
        >
          Sign Out
        </span>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
