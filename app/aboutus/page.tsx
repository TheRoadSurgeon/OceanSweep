"use client";
import Image from "next/image";
import { usePageTitle } from "../context/PageTitleContext";
import { useEffect } from "react";

const teamMembers = [
  {
    name: "Hristian Tountchev",
    role: "Software Engineer",
    image: "/team/Hristian.jpg",
    bio: "Passionate about UI/UX and loves working with React & Tailwind.",
    email: "htountchev@gmail.com",
  },
  {
    name: "Onkar Dangi",
    role: "Software Engineer",
    image: "/team/Onkar.JPG",
    bio: "Enjoys building APIs, working with complex problems and scalibilty issues.",
    email: "odangi2@uic.edu",
  },
  {
    name: "Dante D'Oronzo",
    role: "Software Engineer",
    image: "/team/Dante.png",
    bio: "Ensures smooth workflows and coordinates the team effectively.",
    email: "ddoro2@uic.edu",
  },
  {
    name: "Yurii Koval",
    role: "Software Engineer",
    image: "/team/Yurii.jpeg",
    bio: "Expert in cloud deployments and CI/CD pipelines.",
    email: "ykoval201@gmail.com",
  },
];

export default function AboutPage() {
  const { setTitle } = usePageTitle();

  useEffect(() => {
    setTitle("About Us"); // Set the Navbar title when the page loads
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center">
      {/* Hero Section */}

      <div className="relative w-full h-[60vh] flex items-center justify-center text-center">
        <Image
          src="/ocean-mission.jpg"
          alt="Ocean Background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-6">
          <h1 className="text-5xl font-bold text-white">Our Mission</h1>

          <p className="text-lg text-white max-w-2xl mt-4">
            We are dedicated to protecting and preserving our oceans through
            education, innovation, and action.
          </p>
        </div>
      </div>

      {/* About Section */}

      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8 mt-10">
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Who We Are
        </h2>
        <p className="text-gray-700 mt-4 text-center">
          OceanSweep is an initiative to track and reduce ocean waste through a
          collaborative platform. Our goal is to make environmental data
          accessible and empower individuals to take action. It is built using
          Next.js, Prisma, and Tailwind CSS as a part of the class project for
          CS442.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="max-w-6xl w-full px-6 mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full mb-4"
              />

              <h2 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h2>

              <p className="text-sm text-blue-500">{member.email}</p>

              <p className="text-sm text-gray-600 mt-3 text-center">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
