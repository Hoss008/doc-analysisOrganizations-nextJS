import { currentUser } from "@clerk/nextjs/server";

export async function syncUserToDatabase() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return null;
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const name =`${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    // Check if user exists in db
    let dbUser = await prisma.user.findUnique({
      where: { ClerkId: clerkUser.id },
    });
    if(dbUser) {
        // Update exisitng user 
        dbUser = await prisma.user.update({
            where: { ClerkId: clerkUser.id },
            data: {
                email,
                name: name || dbUser.name, // Update name only if it's not empty
            },
        });
    } else{
        // Create new user
        dbUser = await prisma.user.create({
            data: {
                ClerkId: clerkUser.id,
                email,
                name,
            },
        });
        console.log(`Created new user in DB:, ${email}`);
    }

  } catch (error) {
    // Handle error
    console.error(`Error syncing user to database:`, error);
  }
}
