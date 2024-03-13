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
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  } else {
    users = await db.user.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  return users;
}
