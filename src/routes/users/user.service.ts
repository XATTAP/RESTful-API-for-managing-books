import config from "@/config"
import User from "@/db/models/User.model"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import { IKoaContext } from "@/interfaces"
import { Op } from "sequelize"
import { ILoginDTO, IRegisterDTO, IUpdateRoleDTO, IUserVerifyDTO } from "@/routes/users/dtos/index"
import { AuthenticationError, NotFoundError, ServerValidationError } from "@/utils/errors"
import { Role, generateHash, sendVerifyMail } from "@/utils"

class UserService {
  async register(body: IRegisterDTO) {

    const foundUser = await User.findOne({
      where:
      {
        [Op.or]: [
          { username: body.username },
          { email: body.email }
        ]
      }
    })

    if (foundUser) {
      throw new ServerValidationError(
        "400",
        "Пользователь уже есть в системе"
      )
    }

    body.password = await generateHash(body.password)
    const user = await User.create({ ...body })

    await sendVerifyMail(body.email)

    return {message: `Пользователь ${user.username} зарегистрирован, осталось подтвердить email`, user }
  }

  async login(ctx: IKoaContext, body: ILoginDTO) {
    const foundUser = await User.scope("withPassword").findOne({ where: { username: body.username } })

    if (!foundUser) {
      throw new AuthenticationError("401", "Неверный логин")
    }

    const isPassEquals = await bcrypt.compare(body.password, foundUser.password)
    if (!isPassEquals) {
      throw new AuthenticationError("401", "Неверный пароль")
    }

    const accessToken = jwt.sign({ userId: foundUser.id }, config.server.tokens.accessJWTSecret, { expiresIn: "1d" })

    if (config.env == "production") {
      ctx.cookies.set('Authorization', `Bearer ${accessToken}`, {
        httpOnly: true,
        expires: new Date(new Date().valueOf() + 864e5),
        secure: true
      });
    } else {
      ctx.cookies.set('Authorization', `Bearer ${accessToken}`, {
        httpOnly: true,
        expires: new Date(new Date().valueOf() + 864e5)
      });
    }

    return { message: "вход выполнен успешно!", accessToken }
  }

  async verify(query: IUserVerifyDTO) {
    const payload = jwt.verify(query.emailToken, config.server.tokens.accessJWTSecret) as JwtPayload

    if (payload.email) {
      const user: User = await User.findOne({ where: { email: payload.email } })
      if (!user){
        throw new NotFoundError("404", "Пользователь не найден")
      }
      user.isActive = true
      user.save()

      return {message: "Почта подтверждена", user}
    } else {
      throw new ServerValidationError("400", "Неверный токен")
    }
  }
  
  async updateRole(userId: number, body: IUpdateRoleDTO) {
    const user = await User.findOne({ where: { id: userId } })

    if (!user) {
      throw new NotFoundError("404", "Пользователь не найден")
    }

    user.role = body.role
    user.save()

    return {message: "Роли обновлены", user}
  }
}
export const usersFactory = () => new UserService()
