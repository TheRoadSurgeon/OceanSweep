"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { usePageTitle } from "../context/PageTitleContext";

const FeedbackForm: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Feedback"); // Set the Navbar title when the page loads
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFeedback(); // Call the async function separately
  };

  const submitFeedback = async () => {
    // Make the API call to submit feedback
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          description,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Feedback submitted:", data);
        router.push("/dashboard"); // Example: Redirect to a "Thank You" page
      } else {
        console.error("Error submitting feedback:", data.error);
        alert("Error submitting feedback, please try again later");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred, please try again later");
    }
  };

  const handleCancel = () => {
    console.log("Feedback submission cancelled");
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Submit Feedback</title>
      </Head>
      <div className="min-w-screen flex items-center justify-start from-blue-50 to-indigo-50">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Submit Feedback
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                className="block text-gray-700 font-medium text-sm mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                placeholder="Enter subject"
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium text-sm mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                placeholder="Enter description"
                rows={6}
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="w-32 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-32 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;
