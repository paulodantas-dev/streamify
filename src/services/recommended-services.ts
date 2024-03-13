import { db } from "@/lib/db";

import { getSelf } from "@/services/auth-services";

export async function getRecommended() {
  let userId: string | null;

  try {
    const self = await getSelf();

    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              banishedBy: {
                some: {
                  banisherId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return users;
}
