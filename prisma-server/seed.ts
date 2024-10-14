import { PrismaClient } from "@prisma/client";
import { copycat } from "@snaplet/copycat";

const keys = ["hey", "welcome", "to", "another", "tutorial"];

const db = new PrismaClient();

const seed = async () => {
  // Avoid duplicate entries
  try {
    await db.user.createManyAndReturn({
      select: { id: true },
      data: keys.map((key) => ({
        email: copycat.email(key),
      })),
    });
  } catch (error) {
    console.log("Seeding already done for users");
  }

  // Get all the user ids and create posts for them
  const users = await db.user.findMany({
    select: { id: true },
  });

  for (const user of users) {
    await db.post.create({
      data: {
        title: copycat.sentence(user.id + Date.now()),
        authorId: user.id,
      },
    });
  }

  console.log("Seeding done");
  console.log("Closing...");
  process.exit(0);
};

seed();
