import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const token = Math.random().toString(36).substring(2, 15); // Generate a unique token
    const registrationData = { name, fatherName, mobileNumber, token };

    // Save registration data to localStorage (or database in a real application)
    localStorage.setItem("registrationData", JSON.stringify(registrationData));

    navigate("/payment"); // Navigate to payment page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] text-white p-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-[#7C295D] mb-4">Registration</h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-lg text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fatherName" className="block text-lg text-gray-700">Father's Name</label>
          <input
            type="text"
            id="fatherName"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-lg text-gray-700">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleRegister}
            className="px-6 py-3 bg-[#7C295D] text-white font-bold rounded-lg"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
