"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useActionState } from "react";
import { authenticate } from "../lib/action";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction] = useActionState(
    authenticate,
    undefined
  );
  const router = useRouter();

  const handleCancel = () => {
    console.log("Login cancelled");
    // Redirect to landing page
    router.push("/");
  };

  return (
    <Suspense>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Image
        src="/oceansweep-bg-underwater.jpg"
        alt="Background"
        quality={100}
        fill={true}
        className="z-0 w-full h-full object-cover"
      />
      <div className="bg-white z-10 bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              //value={formData.email}
              //onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              //value={formData.password}
              //onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded-2xl shadow hover:bg-gray-300 transition-transform transform hover:scale-105"
            >
              Cancel
            </button>

            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-2xl shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Login
            </button>
            {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
          </div>
        </form>
      </div>
    </div>
    </Suspense>
  );
}
