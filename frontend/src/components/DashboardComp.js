import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiDocumentText, HiOutlinePhotograph, HiNewspaper } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import server from '../environment';

export default function DashboardComp() {
  const [memes, setMemes] = useState([]);
  const [images, setImages] = useState([]);
  const [news, setNews] = useState([]);
  const [totalMemes, setTotalMemes] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch(`${server}/api/meme/getmemes?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setMemes(data.memes);
          setTotalMemes(data.totalMemes);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`${server}/api/image/getimages?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setImages(data.images);
          setTotalImages(data.totalImages);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchNews = async () => {
      try {
        const res = await fetch(`${server}/api/news/getnews?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setNews(data.news);
          setTotalNews(data.totalNews);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchMemes();
      fetchImages();
      fetchNews();
    }
  }, [currentUser]);

  return (
    <div className='min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] p-6'>
      <div className='flex gap-4 justify-center'>
        {/* Total Memes */}
        <div className='flex flex-col p-4 bg-red-600 text-white w-full md:w-72 rounded-lg shadow-lg'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-md uppercase'>Total Memes</h3>
              <p className='text-2xl'>{totalMemes}</p>
            </div>
            <HiOutlinePhotograph className='bg-yellow-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>

        {/* Total Images */}
        <div className='flex flex-col p-4 bg-blue-600 text-white w-full md:w-72 rounded-lg shadow-lg'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-md uppercase'>Total Images</h3>
              <p className='text-2xl'>{totalImages}</p>
            </div>
            <HiDocumentText className='bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>

        {/* Total News */}
        <div className='flex flex-col p-4 bg-purple-600 text-white w-full md:w-72 rounded-lg shadow-lg'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-md uppercase'>Total News</h3>
              <p className='text-2xl'>{totalNews}</p>
            </div>
            <HiNewspaper className='bg-pink-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-4 py-6 justify-center'>
        {/* Recent Memes */}
        <div className='flex flex-col w-full md:w-auto bg-gray-800 p-4 rounded-lg shadow-lg'>
          <div className='flex justify-between text-sm font-semibold'>
            <h1 className='text-center p-2 text-white'>Recent Memes</h1>
            <Link to={'/dashboard?tab=memes'} className='text-white text-sm border-b-2 border-purple-500 hover:text-purple-300'>
              See all
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-white'>
              <thead>
                <tr>
                  <th className='p-2'>Meme Image</th>
                  <th className='p-2'>Meme Title</th>
                </tr>
              </thead>
              <tbody>
                {memes.map((meme) => (
                  <tr key={meme._id} className='border-b'>
                    <td className='p-2'>
                      <img src={meme.image} alt='meme' className='w-10 h-10 rounded-full' />
                    </td>
                    <td className='p-2'>{meme.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Images */}
        <div className='flex flex-col w-full md:w-auto bg-gray-800 p-4 rounded-lg shadow-lg'>
          <div className='flex justify-between text-sm font-semibold'>
            <h1 className='text-center p-2 text-white'>Recent Images</h1>
            <Link to={'/dashboard?tab=images'} className='text-white text-sm border-b-2 border-purple-500 hover:text-purple-300'>
              See all
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-white'>
              <thead>
                <tr>
                  <th className='p-2'>Image</th>
                  <th className='p-2'>Image Title</th>
                </tr>
              </thead>
              <tbody>
                {images.map((image) => (
                  <tr key={image._id} className='border-b'>
                    <td className='p-2'>
                      <img src={image.url} alt='image' className='w-14 h-10 rounded-md' />
                    </td>
                    <td className='p-2'>{image.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent News */}
        <div className='flex flex-col w-full md:w-auto bg-gray-800 p-4 rounded-lg shadow-lg'>
          <div className='flex justify-between text-sm font-semibold'>
            <h1 className='text-center p-2 text-white'>Recent News</h1>
            <Link to={'/dashboard?tab=news'} className='text-white text-sm border-b-2 border-purple-500 hover:text-purple-300'>
              See all
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full text-white'>
              <thead>
                <tr>
                  <th className='p-2'>News Title</th>
                  <th className='p-2'>Category</th>
                </tr>
              </thead>
              <tbody>
                {news.map((article) => (
                  <tr key={article._id} className='border-b'>
                    <td className='p-2'>{article.title}</td>
                    <td className='p-2'>{article.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
