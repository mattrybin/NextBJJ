import { initTRPC } from "@trpc/server"
import { z } from "zod"
import {
  accountInput,
  accountOutputDummy,
  accountOutput,
  accountCreateInput,
  accountCreateOutput,
  accountCreateOutputDummy,
} from "./schema/account"

export const t = initTRPC.meta().create()
export const api = t.procedure

export const appRouter = t.router({
  account: api
    .input(accountInput.extend({ type: z.string() }))
    .output(accountOutput)
    .query(accountOutputDummy),
  accountCreate: api
    .input(accountCreateInput)
    .output(accountCreateOutput)
    .mutation(accountCreateOutputDummy),
})

export type Router = typeof appRouter
