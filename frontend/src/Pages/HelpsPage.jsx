import React from 'react';

const HelpsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center text-[#7C295D] mb-6">
          How Can We Help You?
        </h1>
        <p className="text-gray-700 text-center mb-8">
          Find answers to frequently asked questions, or reach out to us for support.
        </p>

        {/* FAQ Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#7C295D] mb-2">Frequently Asked Questions</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>How do I upload an image?</strong> <br />
                Navigate to the "Upload" page and fill in the title and upload your image using the provided form.
              </li>
              <li>
                <strong>What file formats are supported?</strong> <br />
                Currently, we support JPEG, PNG, and JPG file formats.
              </li>
              <li>
                <strong>Who can I contact for help?</strong> <br />
                Reach out to us via the contact form or email at <span className="text-[#7C295D] font-semibold">support@cmdcollege.com</span>.
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-semibold text-[#7C295D] mb-2">Contact Support</h2>
            <p className="text-gray-700 mb-4">
              Need further assistance? Fill out the form below, and our team will get back to you shortly.
            </p>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C295D] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C295D] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C295D] focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-[#7C295D] to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpsPage;
