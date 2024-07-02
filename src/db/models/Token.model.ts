import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  BelongsTo
} from "sequelize-typescript"
import User from "@/db/models/User.model"

@Table({
  timestamps: true
})
class Token extends Model {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number

  @AllowNull(false)
  @Column(DataType.TEXT)
  refreshToken: string

  @BelongsTo(() => User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: "userId"
  })
  user: User
}

export default Token
