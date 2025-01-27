import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { Provider } from 'react-redux';

import './index.css';

import Home from './Pages/Home';
import About from './Pages/About';
import Events from './Pages/Events';
import UploadImage from './Pages/UploadImage';
import Feedback from './Pages/Feedbacks';
import Image from './Pages/Images';

import Pass from './Pages/Pass';
import HelpsPage from './Pages/HelpsPage';
import NewsPage from './Pages/NewsPage';
import MemesPage from './Pages/MemesPage';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import EventDetails from './Pages/EventDetails';
import CreateEvent from './Pages/CreateEvent';
import AnnouncementPage from './Pages/Announcement';
import BookingPage from './Pages/BookingPage'; // Import BookingPage
import BookingConfirmation from './Pages/BookingConfirmation';
import BadBookingConfirmation from './Pages/BadBookingConfirmation';
import PaymentPage from './Pages/PaymentPage ';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFonud'; // Fixed typo
import WelcomeScreen from './components/WelcomeScreen';
import Thankyou from './components/Thankyou';

import { store, persistor } from './redux/store';

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
            <Route path="/events" element={<Events />} />
            <Route path="/help" element={<HelpsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/memes" element={<MemesPage />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path="/announcement" element={<AnnouncementPage />} />
           

            {/* PrivateRoute wraps these routes to ensure authentication */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path='/create-event' element={<CreateEvent />} />
              <Route path="/upload" element={<UploadImage />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/pass/:paymentToken" element={<Pass />} />
              <Route path="/thank-you" element={<Thankyou />} />
              <Route path="/book/:id" element={<BookingPage />} /> {/* Added BookingPage route */}
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/bad-booking-confirmation" element={<BadBookingConfirmation />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Route>

            {/* Fallback route */}
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
  <Provider store={store}> {/* Wrap App component with Provider and pass the store */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);