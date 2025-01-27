import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-tl from-[#7C295D] to-[#F3C7D9] py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white sm:text-6xl">
            CMD College
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
            Explore education, innovation, and creativity at CMD College, Bilaspur.
          </p>
        </div>

        {/* College Details Section */}
        <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105">
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
              CMD College is a premier institution committed to providing top-tier education with modern facilities and a talented faculty. We offer an immersive environment where students thrive academically and personally.
            </p>
          </div>
        </div>

        {/* CMDians Section */}
        <div className="flex flex-col lg:flex-row bg-[#F9FAFB] shadow-lg rounded-xl overflow-hidden mt-12 transform transition-all duration-500 hover:scale-105">
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
              The CMDians is your ultimate event planner for students. From student events to news and activities, our team ensures an unforgettable experience. Join us to stay connected and engaged with everything CMD College offers.
            </p>
          </div>
        </div>

        {/* Student Life Section */}
        <div className="flex flex-col lg:flex-row-reverse bg-[#E8D4E8] shadow-lg rounded-xl overflow-hidden mt-12 transform transition-all duration-500 hover:scale-105">
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
              Life at CMD College is about building memories. With vibrant events, academic clubs, and sports activities, students can grow, make new friends, and enjoy a fulfilling life both inside and outside the classroom.
            </p>
          </div>
        </div>

        {/* Closing Section */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            At CMD College, we nurture not only intellect but also the spirit of togetherness. Be a part of The CMDians for an enriching and memorable journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
