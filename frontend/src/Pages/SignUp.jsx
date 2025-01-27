import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import server from '../environment';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`${server}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] flex justify-center items-center">
      <div className="flex max-w-2xl bg-white p-8 rounded-3xl shadow-xl gap-8">
        {/* Left Section */}
        <div className="flex-1 text-center">
          <Link to="/" className="font-bold text-5xl text-gray-800 tracking-wide">
            The CMDians
          </Link>
          <p className="text-sm mt-6 text-gray-600">
            Sign up with your email and password or with Google.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-100 p-6 rounded-2xl shadow-lg">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-xl font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className={`mt-6 py-3 px-6 rounded-xl text-white text-lg font-semibold ${loading ? 'bg-gray-500' : 'bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600'}`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <OAuth />

            <div className="flex justify-center text-sm mt-5">
              <span className="text-gray-700">Already have an account?</span>
              <Link to="/sign-in" className="ml-2 text-indigo-600 font-semibold hover:text-indigo-800">Sign In</Link>
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
