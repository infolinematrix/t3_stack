import { nativeEnum, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema/user";
import { eq } from "drizzle-orm";
import { root } from ".eslintrc.cjs";
import { count } from "console";
import { UserRole } from "@/server/auth/roles";
import { Status } from "@/constants/constants";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
        with: { accounts: true },
      });

      // await new Promise((resolve) => setTimeout(resolve, 5000));
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

  //-------update User
  update: protectedProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        name: z.string().min(1),
        email: z.string().min(1),
        role: nativeEnum(UserRole),
        status: nativeEnum(Status),
        country: z.string().min(1),
        state: z.string().min(1),
        city: z.string().min(1),
        pincode: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          name: input.name,
          email: input.email,
          role: input.role,
          status: input.status,
          country: input.country,
          state: input.state,
          city: input.city,
          pincode: input.pincode,
        })
        .where(eq(users.id, input.userId));
    }),
});
