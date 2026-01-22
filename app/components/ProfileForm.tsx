"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserProfile } from "../api/profile/action";
import { Loader2 } from "lucide-react"; // Loading icon

const profileSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  zip: z.string().min(5, "Invalid ZIP code").max(10),
  username: z.string().min(3, "Username must be at least 3 characters"),
  role: z.enum(["VOLUNTEER", "EXPERT", "ORGANIZER", "CONSULTANT"]),
});

type ProfileFormProps = {
  user: {
    firstname: string;
    lastname: string;
    email: string;
    zip: string;
    username: string;
    userrole: "VOLUNTEER" | "EXPERT" | "ORGANIZER" | "CONSULTANT";
  };
  onClose: () => void;
};

export default function ProfileForm({ user, onClose }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      zip: user.zip,
      username: user.username,
      role: user.userrole,
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await updateUserProfile(data);
    setLoading(false);
    if (response.success) {
      router.refresh();
      alert("Profile updated successfully!");
      onClose();
    } else {
      alert(response.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            {...register("firstname")}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            {...register("lastname")}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastname && <p className="text-sm text-red-500">{errors.lastname.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password (Optional)</label>
          <input
            {...register("password")}
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ZIP Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            {...register("zip")}
            placeholder="ZIP Code"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.zip && <p className="text-sm text-red-500">{errors.zip.message}</p>}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            {...register("username")}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>

        {/* Role Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            {...register("role")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="VOLUNTEER">Volunteer</option>
            <option value="EXPERT">Expert</option>
            <option value="ORGANIZER">Organizer</option>
            <option value="CONSULTANT">Consultant</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Update Profile"}
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 text-gray-600 hover:text-gray-800 text-center"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}