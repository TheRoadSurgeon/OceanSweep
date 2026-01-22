"use server";

import { auth } from "@/auth";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

export async function updateUserProfile(data: any) {
  try {
    const { firstname, lastname, email, password, zip, username, role } = data;

    // Fetch the logged-in user ID from the session
    const session = await auth();

    if (!session || !session.user) {
      return { success: false, message: "Unauthorized" };
    }

    const userId = session.user.email ?  session.user.email : null;
    if (userId === null) {
      return { success: false, message: "Invalid user ID" };
    }

    const updateData: any = {
      firstname,
      lastname,
      email,
      zip,
      username,
      userrole: role,
      lastupdated: new Date(),
    };

    if (password) {
      updateData.hashedpassword = await bcrypt.hash(password, 10);
    }

    await prisma.users.update({
      where: { email: userId },
      data: updateData,
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: "Error updating profile." };
  }
}
