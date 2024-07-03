import Book from "@/db/models/Book.model"

let seedBooks: Book[]
async function initSeeds() {
  seedBooks = [
    {
      title: "Gladiator",
      author: "Dewey Gram",
      publicationDate: new Date("2001-11-11"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "The Sign Of Four",
      author: "Conan Doyle",
      publicationDate: new Date("1980-02-01"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Peter Pan",
      author: "J. M. Barrie",
      publicationDate: new Date("1904-01-27"),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: "Robin Hood",
      author: "Sally M. Stockton",
      publicationDate: new Date("1998-01-01"),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ] as Book[]
}

export const up = async ({ context: sequelize }) => {
  await initSeeds()
  if (!seedBooks.length) return
  await sequelize
    .getQueryInterface()
    .bulkInsert(Book.tableName, seedBooks)
}

export const down = async ({ context: sequelize }) => {
  await initSeeds()
  await sequelize.getQueryInterface().bulkDelete(Book.tableName, {
    title: seedBooks.map((book: Book) => book.title)
  })
}
