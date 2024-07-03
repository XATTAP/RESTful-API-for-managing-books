import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript"
import Genre from "@/db/models/Genre.model"

@Table({
  timestamps: true
})

class Book extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string

  @AllowNull(false)
  @Column(DataType.STRING)
  author: string

  @AllowNull(false)
  @Column(DataType.DATE)
  publicationDate: Date

  @HasMany(() => Genre,{
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "bookId"
  })
  genres: Genre[]
}

export default Book
