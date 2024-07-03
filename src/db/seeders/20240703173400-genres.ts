import Genre from "@/db/models/Genre.model"
import { GenreName } from "@/utils"

let seedGenres: Genre[]
async function initSeeds() {
  seedGenres = [
    {
      genre: GenreName.Fiction,
      bookId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      genre: GenreName.Mystery,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      genre: GenreName.Thriller,
      bookId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      genre: GenreName.Fantasy,
      bookId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      genre: GenreName.Drama,
      bookId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      genre: GenreName.Fiction,
      bookId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ] as Genre[]
}

export const up = async ({ context: sequelize }) => {
  await initSeeds()
  if (!seedGenres.length) return
  await sequelize
    .getQueryInterface()
    .bulkInsert(Genre.tableName, seedGenres)
}

export const down = async ({ context: sequelize }) => {
  await initSeeds()
  await sequelize.getQueryInterface().bulkDelete(Genre.tableName, {
    id: seedGenres.map((genre: Genre) => genre.id)
  })
}
