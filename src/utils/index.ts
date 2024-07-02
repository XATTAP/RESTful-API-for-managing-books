import { genSalt, hash } from "bcrypt"

export const generateHash = async (str: string, depth = 10) => {
  if (!str) return

  const salt = await genSalt(depth)
  const myHash = await hash(str, salt)

  return myHash
}