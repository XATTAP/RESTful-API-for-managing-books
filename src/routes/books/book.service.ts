import Book from "@/db/models/Book.model"
import Genre from "@/db/models/Genre.model"

class BookService {
  async list() {
    const books = await Book.findAll({
      include: [
        {
          model: Genre,
          attributes: ["genre"]
        }
      ]
    })
    return books
  }

  async getById(bookId: number) {
    const books = await Book.findOne({
      where: {
        id: bookId
      },
      include: [
        {
          model: Genre,
          attributes: ["genre"]
        }
      ]
    })
    return books
  }
}
export const booksFactory = () => new BookService()
