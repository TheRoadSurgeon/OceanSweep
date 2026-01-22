"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "../context/PageTitleContext";
import Image from "next/image";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Event = {
  id: number;
  title: string;
  description: string;
  createddate: string;
  city: string;
  state: string;
  image?: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  image?: string;
};

const mockEvents: Event[] = [
  {
    id: 10,
    title: "Lake Michigan Cleanup",
    description: "Join us to clean up Lake Michigan's shoreline.",
    createddate: "2024-03-15",
    city: "Chicago",
    state: "Illinois",
    image: "/lake.jpg",
  },
  {
    id: 11,
    title: "Central Park Charity Run",
    description: "A fun 5k run to support local charities.",
    createddate: "2024-04-05",
    city: "New York",
    state: "New York",
    image: "/charity-run.jpg",
  },
];

const mockPosts: Post[] = [
  {
    id: 12,
    title: "Tips for Beach Cleanup",
    content: "Here's how you can make your beach cleanup more effective.",
    author: "John Doe",
    date: "2024-02-20",
    image: "/beach-cleanup.jpg",
  },
  {
    id: 13,
    title: "Why Community Events Matter",
    content: "Discover the impact of local community events on neighborhoods.",
    author: "Jane Smith",
    date: "2024-02-18",
    image: "/community-events.jpg",
  },
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<"events" | "posts">("events");
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const router = useRouter();
  const { setTitle } = usePageTitle();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle("Community Feed");
    // Fetch additional data after static data
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch events
      const eventsResponse = await fetch("/api/events");
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents((prevEvents) => [...prevEvents, ...eventsData]); // Merge with static data
      }

      // Fetch posts
      const postsResponse = await fetch("/api/posts");
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts((prevPosts) => [...prevPosts, ...postsData]); // Merge with static data
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    router.push(activeTab === "events" ? "event" : "post");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Community Feed</h1>

      {/* Tab Navigation & Create Button */}
      <div className="flex justify-between w-full max-w-3xl items-center mb-6">
        <div className="flex space-x-4">
          {["events", "posts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "events" | "posts")}
              className={`py-2 px-5 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>New {activeTab === "events" ? "Event" : "Post"}</span>
        </button>
      </div>

      {/* Content Feed */}
      <div className="w-full max-w-3xl space-y-6">
        {loading ? (
          /* Skeleton Loader */
          <div className="space-y-4">
            {Array(3)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="h-40 bg-gray-300 rounded"></div>
                  <div className="h-6 bg-gray-300 rounded w-2/3 mt-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                </div>
              ))}
          </div>
        ) : activeTab === "events" ? (
          events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              {event.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mt-2">{event.description}</p>
                <div className="mt-4 flex justify-between text-gray-500 text-sm">
                  <span>📅 {new Date(event.createddate.replace(" ", "T")).toLocaleDateString()}</span>
                  <span>📍 {event.city}, {event.state}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              {post.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 mt-2">{post.content}</p>
                <div className="mt-4 flex justify-between text-gray-500 text-sm">
                  <span>✍️ {post.author}</span>
                  <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
