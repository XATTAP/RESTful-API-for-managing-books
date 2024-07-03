import User from "@/db/models/User.model"
import { generateHash } from "@/utils"

let seedUsers: User[]
async function initSeeds() {
  seedUsers = [
    {
      username: "Иван Иванович",
      email: "ii@mail.ru",
      rolesbit: 1,
      password: await generateHash("123456"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: "Петр Петрович",
      email: "pp@mail.ru",
      rolesbit: 3,
      password: await generateHash("123456"),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ] as User[]
}

export const up = async ({ context: sequelize }) => {
  await initSeeds()
  if (!seedUsers.length) return
  await sequelize
    .getQueryInterface()
    .bulkInsert(User.tableName, seedUsers)
}

export const down = async ({ context: sequelize }) => {
  await initSeeds()
  await sequelize.getQueryInterface().bulkDelete(User.tableName,  {
    username: seedUsers.map((user: User) => user.username)
  })
}
