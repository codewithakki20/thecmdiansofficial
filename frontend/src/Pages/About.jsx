import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">
            CMD College
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the heart of education and exploration in Bilaspur, Chhattisgarh.
          </p>
        </div>

        {/* College Details Section */}
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="lg:w-1/2">
            <img
              src="college-campus.jpg" // Replace with your actual college campus image
              alt="CMD College Campus"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-[#7C295D] mb-4">
              About Our Institution
            </h2>
            <p className="text-gray-700 leading-relaxed">
              CMD College is a premier educational institution known for its commitment to providing quality education. With modern facilities and a dedicated faculty, our campus is a hub of learning and growth for students from diverse backgrounds.
            </p>
          </div>
        </div>

        {/* CMDians Section */}
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden mt-8">
          <div className="lg:w-1/2">
            <img
              src="./The CMDians.jpeg" // Replace with actual CMDians logo image
              alt="The CMDians Logo"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <h2 className="text-3xl font-semibold text-[#7C295D] mb-4">
               The CMDians
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The CMDians is your go-to event planner for students. Whether you're looking for the latest student events, fun activities, or engaging news, we've got it all. Our team is dedicated to bringing you exciting events, valuable assistance, and an unforgettable student experience.
            </p>
          </div>
        </div>

        {/* Student Life Section */}
        <div className="flex flex-col lg:flex-row-reverse bg-[#F3E6F8] shadow-lg rounded-lg overflow-hidden mt-8">
          <div className="lg:w-1/2">
            <img
              src="/image1.jpeg" // Replace with an image representing student life
              alt="CMD College Student Life"
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-semibold text-[#7C295D] mb-4">
              CMD College Student Life
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Life at CMD College is an experience like no other. From vibrant campus events to collaborative student organizations, every day offers a chance to grow, engage, and create lifelong memories. Whether it's sports, cultural festivals, or academic clubs, there's something for every student to get involved in.
            </p>
          </div>
        </div>

        {/* Closing Section */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            At CMD College, we focus on more than just academics. Join The CMDians for a memorable student experience with exciting events and much more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
