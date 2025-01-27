import React, { useState, useEffect } from "react";
import server from "../environment";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", feedback: "" });

  // Fetch Feedbacks from Backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${server}/api/feedbacks`);
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.feedback) {
      try {
        const response = await fetch(`${server}/api/feedbacks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const newFeedback = await response.json();
          setFeedbacks([newFeedback, ...feedbacks]); // Add new feedback to the top of the list
          setFormData({ name: "", email: "", feedback: "" }); // Reset form
        } else {
          console.error("Error posting feedback:", response.statusText);
        }
      } catch (error) {
        console.error("Error posting feedback:", error);
      }
    }
  };

  // Delete Feedback
  const deleteFeedback = async (id) => {
    try {
      const response = await fetch(`${server}/api/feedbacks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id)); // Remove deleted feedback from state
      } else {
        console.error("Error deleting feedback:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#7C295D] to-[#F3C7D9] min-h-screen flex items-center justify-center py-8">
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#7C295D] mb-6">Your Feedback</h1>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C295D]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C295D]"
              required
            />
          </div>
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="4"
              value={formData.feedback}
              onChange={handleInputChange}
              placeholder="Write your feedback here..."
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C295D]"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#7C295D] to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition duration-300"
            >
              Post Feedback
            </button>
          </div>
        </form>

        {/* Display Feedbacks */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#7C295D] mb-4">All Feedback</h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-500">No Feedback yet. Be the first to give feedback!</p>
          ) : (
            <ul className="space-y-4">
              {feedbacks.map((feedback) => (
                <li
                  key={feedback._id}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-700 mb-2">"{feedback.feedback}"</p>
                    <h4 className="text-gray-800 font-semibold">- {feedback.name}</h4>
                    <p className="text-sm text-gray-500">{feedback.email}</p>
                  </div>
                  <button
                    onClick={() => deleteFeedback(feedback._id)}
                    className="text-red-600 font-semibold hover:text-red-800 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
