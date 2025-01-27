import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import server from "../environment";

const AnnouncementForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${server}/api/announcements`, data);
      
      if (response.data.success) {
        alert("Announcement created successfully!");
        reset();
      } else {
        alert("Failed to create announcement.");
      }
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("An error occurred while creating the announcement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-[#7C295D]">Create Announcement</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter announcement title"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            {...register("date", { required: true })}
            type="date"
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.date && <p className="text-red-500 text-sm">Date is required</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            {...register("content", { required: true })}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter announcement content"
          ></textarea>
          {errors.content && <p className="text-red-500 text-sm">Content is required</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#7C295D] text-white font-bold py-2 rounded-lg hover:bg-[#5e2048] disabled:bg-[#D1B0D9]"
        >
          {isSubmitting ? "Submitting..." : "Create Announcement"}
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
