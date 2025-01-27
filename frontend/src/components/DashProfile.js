import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import server from '../environment';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait for image to upload');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`${server}/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`${server}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
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

  const handleSignout = async () => {
    try {
      const res = await fetch(`${server}/api/user/signout`, {
        method: 'POST',
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
    <div className="max-w-lg mx-auto p-6 w-full bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] rounded-lg shadow-lg">
      <h1 className="my-5 text-center font-semibold text-3xl text-indigo-600">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full bg-gray-200 hover:bg-indigo-100 transition duration-300 ease-in-out"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-4 border-indigo-500 ${imageFileUploading && 'opacity-60'}`}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        {imageFileUploadError && (
          <div className="bg-red-500 text-white p-2 rounded-md">{imageFileUploadError}</div>
        )}
        <input
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border-gray-300 rounded-lg p-2"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border-gray-300 rounded-lg p-2"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          disabled={loading || imageFileUploading}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
        {currentUser.isAdmin && (
          <Link to={'/create-event'}>
            <button className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition duration-300">
              Create an Event
            </button>
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer hover:text-red-700 transition duration-200"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="cursor-pointer hover:text-red-700 transition duration-200"
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <div className="mt-5 bg-green-500 text-white p-2 rounded-md">
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className="mt-5 bg-red-500 text-white p-2 rounded-md">
          {updateUserError}
        </div>
      )}
      {error && (
        <div className="mt-5 bg-red-500 text-white p-2 rounded-md">
          {error}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-600">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
