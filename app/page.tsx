import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Image
        src="/oceansweep-bg.jpg"
        alt="Background"
        layout="fill"
        quality={100}
        className="z-0"
      />
      <div className="relative bg-white bg-opacity-80 p-8 rounded-2xl shadow-xl text-center max-w-md w-full z-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Ocean Sweep</h1>
        <p className="text-gray-600 mb-6">Join us today in ocean management and conservation!</p>
        <div className="space-y-4">
          <Link href="/signup" className="w-full inline-block bg-blue-500 text-white py-2 px-4 rounded-2xl shadow hover:bg-blue-600 transition-transform transform hover:scale-105">
            Sign Up
          </Link>
          <Link href="/login" className="w-full inline-block bg-gray-200 text-gray-800 py-2 px-4 rounded-2xl shadow hover:bg-gray-300 transition-transform transform hover:scale-105">
            Login
          </Link>
        </div>
      </div>
    </div>

  );
}
