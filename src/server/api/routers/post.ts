
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { posts } from "@/server/db/schema/user";




export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

    getLatest: protectedProcedure.query( async ({ctx}) => {
      const allPost = await ctx.db.query.posts.findMany({
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      });

      return allPost ?? null
    }),
  
 
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

 

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
