import config from "@/config"
import User from "@/db/models/User.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IKoaContext } from "@/interfaces"
import { ILoginDTO } from "@/routes/users/dtos/index"
import { NotFoundError, ServerValidationError } from "@/utils/errors"

class UserService {
  async login(ctx: IKoaContext, body: ILoginDTO) {
    const foundUser = await User.scope("withPassword").findOne({ where: { username: body.username } })

    if (!foundUser) {
      throw new NotFoundError("404", "Пользователь не найден")
    }

    const isPassEquals = await bcrypt.compare(body.password, foundUser.password)
    if (!isPassEquals) {
      throw new ServerValidationError("400", "Неверный пароль")
    }

    const accessToken = jwt.sign({ userId: foundUser.id }, config.server.tokens.accessJWTSecret, { expiresIn: "1d" })

    if (config.env == "production"){
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
}
export const usersFactory = () => new UserService()
