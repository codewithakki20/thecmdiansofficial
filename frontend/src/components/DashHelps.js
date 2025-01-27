import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../environment";

const HelpRequestsPage = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await axios.get(`${server}/api/help-requests`);
        setHelpRequests(response.data.requests);
      } catch (error) {
        console.error("Error fetching help requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#7C295D]">Help Requests</h1>
      {helpRequests.length === 0 ? (
        <p>No help requests found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Message</th>
              <th className="border px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {helpRequests.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{request.name}</td>
                <td className="border px-4 py-2">{request.message}</td>
                <td className="border px-4 py-2">{new Date(request.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HelpRequestsPage;
