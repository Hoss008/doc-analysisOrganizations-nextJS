import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function syncUserToDatabase() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const name =
      `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    // Check if user exists in db
    let dbUser = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });
    if (dbUser) {
      // Update existing user
      dbUser = await prisma.user.update({
        where: { clerkUserId: clerkUser.id },
        data: {
          email,
          name: name || dbUser.name,
        },
      });
    } else {
      // Create new user
      dbUser = await prisma.user.create({
        data: {
          clerkUserId: clerkUser.id,
          email,
          name,
        },
      });
      console.log(`Created new user in DB: ${email}`);
    }
  } catch (error) {
    // Handle error
    console.error(`Error syncing user to database:`, error);
  }
}
