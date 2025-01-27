import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import server from '../environment';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }

    try {
      dispatch(signInStart());

      const res = await fetch(`${server}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return dispatch(signInFailure(errorData.message || 'Something went wrong'));
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message || 'An error occurred'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] flex justify-center items-center">
      <div className="flex max-w-2xl bg-white p-8 rounded-2xl shadow-lg gap-6">
        {/* Left Section */}
        <div className="flex-1 text-center">
          <Link to="/" className="font-bold text-4xl text-gray-800">
            The CMDians
          </Link>
          <p className="text-sm mt-5 text-gray-600">
            Sign in with your email and password or with Google.
          </p>
        </div>
        
        {/* Right Section */}
        <div className="flex-1 bg-gray-100 p-6 rounded-xl shadow-md">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="**********"
                className="w-full p-4 mt-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={`mt-6 py-3 px-6 rounded-full text-white text-lg font-semibold ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'}`}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>

            <OAuth />

            <div className="flex justify-center text-sm mt-5">
              <span className="text-gray-700">Don't have an account?</span>
              <Link to="/sign-up" className="ml-2 text-blue-600 font-semibold">Sign Up</Link>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-5 text-sm text-red-500 p-4 bg-red-100 border border-red-300 rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
