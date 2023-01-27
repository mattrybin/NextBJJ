import { z } from "zod"

// Example of preprocessing function
const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u)

export const Account = z.object({
  accountId: z.string().uuid(),
  email: z.preprocess(trimString, z.string().email()),
  givenName: z.string().min(2).max(50),
  familyName: z.string().min(2).max(50),
  height: z.number().int().positive().min(1_000).max(2_300), // In cm
  weight: z.number().int().positive().min(30_000).max(200_000), // In grams
  gender: z.enum(["male", "female"]),
})

export const accountInput = Account.pick({ email: true })
export const accountOutput = Account
export const accountOutputDummy = (): z.infer<typeof Account> => ({
  accountId: "8be1cd36-36cd-418e-9b6a-cfa9873f0266",
  email: "example@gmail.com",
  givenName: "Matt",
  familyName: "Rybin",
  height: 1_810,
  weight: 81_000,
  gender: "male",
})

export const accountCreateInput = Account.omit({ accountId: true })
export const accountCreateOutput = Account
export const accountCreateOutputDummy = accountOutputDummy

// Example of creating type from zod
export type accountType = z.infer<typeof Account>
