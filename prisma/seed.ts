import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

import { getCategories } from "./faker/fake_categories";
import { getPosts } from "./faker/fake_posts";

async function seed() {
  const kody = await db.user.create({
    data: {
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
      email: "kody@correo.com",
      profile: {
        create: {
          displayName: "Kody",
          bio: "Hi, I'm Kody!",
          avatar: "https://example.com/avatar.jpg",
          firstName: "Kody",
          lastName: "Smith",
          birthday: new Date("1995-05-07T00:00:00.000Z"),
          address: "123 Main St",
          phone: "+1-555-555-5555",
        },
      },
    },
    include: {
      profile: true,
    },
  });
  // SEED POSTS
  await Promise.all(
    getPosts().map((post) => {
      const data = { authorId: kody.id, ...post };
      return db.post.create({ data });
    })
  );
  // SEED CATEGORIES
  // await Promise.all(
  //   getCategories().map((category) => {
  //     const data = { ...category };
  //     return db.category.create({ data });
  //   })
  // );

  // CREATE OR UPDATE USER SETTINGS
  await db.$transaction([
    db.profile.update({
      where: { id: kody.profile?.id },
      data: {
        userSettings: {
          create: {
            emailNotifications: true,
            theme: "light",
          },
        },
      },
      include: {
        userSettings: true,
      },
    }),
  ]);
}

seed();
