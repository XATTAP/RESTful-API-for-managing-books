import Book from "@/db/models/Book.model"
import Genre from "@/db/models/Genre.model"
import { NotFoundError } from "@/utils/errors"
import { IUpdateBookDTO } from "@/routes/books/dtos"
import { sequelize } from "@/db/sequelize"
import { GenreName } from "@/utils"
import lodash from "lodash"

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
  
  async create(body: IUpdateBookDTO) {
    const transaction = await sequelize.transaction()
    try {

      const book = await Book.create({ ...body }, { transaction })

      if (body.genres) {
        body.genres = lodash.uniq(body.genres);

        await Promise.all(
          body.genres.map(async (genre: GenreName) => {
            const newGenre = new Genre()
            newGenre.genre = genre
            newGenre.bookId = book.id
            await newGenre.save({ transaction })
          })
        )
      }

      await transaction.commit()
      return { message: `Книга ${book.title} добавлена`, book }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getById(bookId: number) {
    const book = await Book.findOne({
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

    if (!book) {
      throw new NotFoundError("404", "Книга не найдена")
    }

    return book
  }

  async updateById(bookId: number, body: IUpdateBookDTO) {
    const book = await Book.findOne({
      where: { id: bookId }
    })

    if (!book) {
      throw new NotFoundError("404", "Книга не найдена")
    }

    const transaction = await sequelize.transaction()
    try {

      await book.update({ ...body }, { transaction })

      if (body.genres) {
        body.genres = lodash.uniq(body.genres);
        await Genre.destroy({ where: { bookId: book.id }, transaction })

        await Promise.all(
          body.genres.map(async (genre: GenreName) => {
            const newGenre = new Genre()
            newGenre.genre = genre
            newGenre.bookId = book.id
            await newGenre.save({ transaction })
          })
        )
      }

      await transaction.commit()
      return { message: `Книга ${book.title} обновлена`, book }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async deleteById(bookId: number) {
    const book = await Book.findOne({
      where: { id: bookId }
    })

    if (!book) {
      throw new NotFoundError("404", "Книга не найдена")
    }

    await book.destroy()

    return { message: `Книга ${book.title} удалена` }
  }
}
export const booksFactory = () => new BookService()
