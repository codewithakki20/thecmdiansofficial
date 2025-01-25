import React from "react";
import { useNavigate } from "react-router-dom";
import JsBarcode from "jsbarcode";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('eventToken'); // Retrieve token from localStorage
  const registrationData = JSON.parse(localStorage.getItem("registrationData")) || {
    name: "John Doe",
    fatherName: "Mr. Doe",
    mobileNumber: "1234567890",
  };

  const handleBackToHome = () => {
    navigate('/'); // Redirect to the homepage
  };

  const handleDownloadPass = () => {
    const passContent = `
      Event Pass
      ----------- 
      Name: ${registrationData.name}
      Father's Name: ${registrationData.fatherName}
      Mobile: ${registrationData.mobileNumber}
      Token: ${token}
    `;

    const blob = new Blob([passContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "EventPass.txt";
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white">
      <div className="w-full max-w-lg mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8">Thank You for Registering!</h2>
        <p className="text-center text-lg mb-4">Your registration has been successfully received. We can't wait to see you at the picnic!</p>

        <div className="mb-6 text-center">
          {/* Barcode (Generated dynamically) */}
          <svg ref={(el) => JsBarcode(el, token, { format: "CODE128", displayValue: true, fontSize: 14 })}></svg>
        </div>

        <div className="mt-6 text-center space-y-4">
          <button
            onClick={handleDownloadPass}
            className="px-6 py-3 bg-[#7C295D] text-white font-bold rounded-lg"
          >
            Download Pass
          </button>
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
