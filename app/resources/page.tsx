"use client";

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import { usePageTitle } from "../context/PageTitleContext";
import {
  BookOpenIcon,
  VideoCameraIcon,
  GlobeAltIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

type Resource = {
  id: number;
  title: string;
  description: string;
  url: string;
  category: "Article" | "Video" | "Website" | "PDF";
};

const resources: Resource[] = [
  {
    id: 1,
    title: "The Ocean Cleanup Project",
    description:
      "A groundbreaking initiative to remove plastic from the ocean.",
    url: "https://theoceancleanup.com",
    category: "Website",
  },
  {
    id: 2,
    title: "How Ocean Pollution Affects Marine Life",
    description:
      "A deep dive into the impact of pollution on ocean ecosystems.",
    url: "https://www.nationalgeographic.com/environment/article/ocean-pollution",
    category: "Article",
  },
  {
    id: 3,
    title: "The State of Our Oceans",
    description: "A must-watch documentary on ocean preservation.",
    url: "https://www.youtube.com/watch?v=xyz123",
    category: "Video",
  },
  {
    id: 4,
    title: "UN Sustainable Development Goal 14",
    description: "Official UN report on ocean sustainability.",
    url: "https://sdgs.un.org/goals/goal14",
    category: "PDF",
  },
];

const categoryIcons: Record<string, JSX.Element> = {
  Article: <BookOpenIcon className="w-10 h-10 text-blue-500" />,
  Video: <VideoCameraIcon className="w-10 h-10 text-red-500" />,
  Website: <GlobeAltIcon className="w-10 h-10 text-green-500" />,
  PDF: <DocumentTextIcon className="w-10 h-10 text-gray-500" />,
};

export default function ResourcesPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("Resources"); // Set the Navbar title when the page loads
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Article" | "Video" | "Website" | "PDF"
  >("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources
    .filter(
      (resource) =>
        selectedCategory === "All" || resource.category === selectedCategory
    )
    .filter((resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="relative min-h-screen bg-gray-100 text-white">
      <div className="relative w-full h-[60vh]">
        <Image
          src="/oceansweep-bg.jpg"
          alt="Ocean Preservation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-5xl font-bold">🌊 Protecting Our Oceans</h1>
          <p className="text-lg mt-3 max-w-2xl">
            Explore resources and learn how you can help save marine life.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative w-full py-10 px-6 bg-gradient-to-b from-blue-50 to-white">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap space-x-2 mb-6">
          {["All", "Article", "Video", "Website", "PDF"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-800"
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-white p-10 rounded-lg shadow-lg">
          {["Article", "Video", "Website", "PDF"].map((category, index) => (
            <div key={index} className="flex items-center space-x-4">
              {categoryIcons[category]}{" "}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {category}s
                </h2>
                <p className="text-gray-600">
                  Explore {category.toLowerCase()} resources on ocean
                  preservation.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resource List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {filteredResources.length === 0 ? (
            <p className="text-gray-300">No resources found.</p>
          ) : (
            filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white text-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold">{resource.title}</h2>
                <p className="text-gray-600 mt-2">{resource.description}</p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-blue-500 hover:underline"
                >
                  Learn More →
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="relative h-[500px]">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/ocean-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">Our Oceans Need Us</h2>
        </div>
      </div>

      <div className="fixed bottom-5 right-5">
        <button className="bg-yellow-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600">
          🌊 Take Action
        </button>
      </div>
    </div>
  );
}
