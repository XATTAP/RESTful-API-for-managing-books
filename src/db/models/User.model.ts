import {
    Table,
    Column,
    Model,
    DataType,
    Unique,
    AllowNull,
    DefaultScope,
    Scopes,
    Default
  } from "sequelize-typescript"
  
  @DefaultScope(() => ({
    attributes: { exclude: ["password"] }
  }))
  @Scopes(() => ({
    withPassword: { attributes: { include: ["password"] } }
  }))
  @Table({
    timestamps: true
  })
  
  class User extends Model {
    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    username: string
  
    @AllowNull(false)
    @Column(DataType.STRING)
    email: string
  
    @AllowNull(false)
    @Column(DataType.STRING)
    password: string
  
    @AllowNull(false)
    @Default(1)
    @Column(DataType.INTEGER)
    rolesbit: number

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isActive: boolean
  }
  
  export default User
  