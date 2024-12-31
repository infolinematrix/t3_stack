import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema/user";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
        with: { accounts: true },
      });

      return data ?? null;
    }),
  //-------all users with agination
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.users.findMany({
      offset: 0,
      limit: 25,
    });
    // console.log("----------", data);

    return data ?? null;
  }),
});
