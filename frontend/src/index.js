import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { GlobalWorkerOptions } from 'pdfjs-dist';

import './index.css';

import Home from './Pages/Home';
import About from './Pages/About';
import UploadImage from './Pages/UploadImage';
import Feedback from './Pages/Feedbacks';
import Image from './Pages/Images';
import Events from './Pages/Events';
import Payment from './Pages/Payment';
import Register from './Pages/Registration';
import Pass from './Pages/Pass';
import HelpsPage from './Pages/HelpsPage';
import NewsPage from './Pages/NewsPage';
import MemesPage from './Pages/MemesPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFonud';
import WelcomeScreen from './components/WelcomeScreen';
import Thankyou from './components/Thankyou';

// Set the worker source for pdf.js
GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000); // 3 seconds for WelcomeScreen, adjust as needed

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <>
      {showWelcome && <WelcomeScreen />}
      {!showWelcome && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/images" element={<Image />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/memes" element={<MemesPage />} />
           
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register/:eventToken" element={<Register />} />
            <Route path="/payment" element={<Payment />} />  
            <Route path="/pass/:paymentToken" element={<Pass />} />
            <Route path="/thank-you" element={<Thankyou />} />    
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
