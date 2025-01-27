import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlinePhotograph,
  HiNewspaper,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import server from '../environment';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  const [isLoading, setIsLoading] = useState(false); // For loading state

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    setIsLoading(true); // Set loading state to true
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
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="bg-gradient-to-r bg-[#7C295D] w-full h-screen p-5 flex flex-col">
      <div className="flex flex-col gap-3">
        {/* Dashboard section (only for Admin) */}
        {currentUser && currentUser.isAdmin && (
          <Link to='/dashboard?tab=dash'>
            <div
              className={`flex items-center p-3 rounded-md cursor-pointer ${
                tab === 'dash' || !tab ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <HiDocumentText className="mr-2" />
              Dashboard
            </div>
          </Link>
        )}

        {/* Profile section for both Admin and User */}
        <Link to='/dashboard?tab=profile'>
          <div
            className={`flex items-center p-3 rounded-md cursor-pointer ${
              tab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            <HiUser className="mr-2" />
            Profile
          </div>
        </Link>

        {/* Admin-specific Sections */}
        {currentUser.isAdmin && (
          <>
            <Link to='/dashboard?tab=users'>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  tab === 'users' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <HiOutlineUserGroup className="mr-2" />
                Users
              </div>
            </Link>
            <Link to='/dashboard?tab=uploadmemes'>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  tab === 'uploadmemes' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <HiOutlinePhotograph className="mr-2" />
                Upload Memes
              </div>
            </Link>
            <Link to='/dashboard?tab=uploadimages'>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  tab === 'uploadimages' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <HiDocumentText className="mr-2" />
                Upload Images
              </div>
            </Link>
            <Link to='/dashboard?tab=uploadnews'>
              <div
                className={`flex items-center p-3 rounded-md cursor-pointer ${
                  tab === 'uploadnews' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                <HiNewspaper className="mr-2" />
                Upload News
              </div>
            </Link>
          </>
        )}

        {/* Sign Out Option */}
        <div
          onClick={handleSignout}
          className="flex items-center p-3 rounded-md cursor-pointer mt-5 hover:bg-indigo-600 hover:text-white"
        >
          <HiArrowSmRight className="mr-2" />
          {isLoading ? 'Signing Out...' : 'Sign Out'}
        </div>
      </div>
    </div>
  );
}
