"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";
import { PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";

type UserProfile = {
  firstname: string;
  lastname: string;
  email: string;
  zip: string;
  username: string;
  userrole: "VOLUNTEER" | "EXPERT" | "ORGANIZER" | "CONSULTANT";
};

export default function ProfileCard({ user }: { user: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-md ml-0 p-6 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl border border-gray-200 transition-all hover:shadow-xl">
      {isEditing ? (
        <ProfileForm user={user} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <UserCircleIcon className="w-12 h-12 text-gray-400" />
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-all"
            >
              <PencilIcon className="w-6 h-6 text-gray-600 hover:text-gray-800" />
            </button>
          </div>

          {/* Profile Details */}
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-600">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="text-gray-600">ZIP Code:</strong> {user.zip}
            </p>
            <p>
              <strong className="text-gray-600">Role:</strong>{" "}
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-blue-500">
                {user.userrole}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
}