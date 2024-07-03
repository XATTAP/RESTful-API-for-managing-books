import { GenreName } from "@/utils"
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from "sequelize-typescript"

@Table({
  timestamps: true
})

class Genre extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM({ values: Object.keys(GenreName) }))
  genre: GenreName

  @AllowNull(false)
  @Column(DataType.INTEGER)
  bookId: number
}

export default Genre
