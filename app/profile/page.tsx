import { prisma } from "../lib/prisma";
import { auth } from "@/auth";
import ProfileCard from "../components/ProfileCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile", // Dynamic title for profile page
};

export default async function ProfilePage() {
  const session = await auth();
  console.log(session);
  console.log(session?.user);

  if (!session || !session.user) {
    return (
      <p className="text-red-500">You must be logged in to view this page.</p>
    );
  }

  const email = session.user.email;
  if (!email) {
    return <p className="text-red-500">User email not found.</p>;
  }

  const user = await prisma.users.findUnique({
    where: { email },
    select: {
      firstname: true,
      lastname: true,
      email: true,
      zip: true,
      username: true,
      userrole: true,
    },
  });

  if (!user) {
    return <p className="text-red-500">User not found.</p>;
  }

  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
}
