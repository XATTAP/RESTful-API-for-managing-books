import config from "@/config"
import jwt from "jsonwebtoken"
import { type IKoaContext } from "@/interfaces/index"
import { type Next } from "koa"
import { AuthenticationError } from "@/utils/errors"
import { type JwtPayload } from "jsonwebtoken"
import Token from "@/db/models/Token.model"
import User from "@/db/models/User.model"

export default async (ctx: IKoaContext, next: Next) => {
  try {
    let token: string

    if (ctx.request.headers && ctx.request.headers.authorization) {
      token = ctx.request.headers.authorization.split("Bearer ")[1]
    }
    if (!token) {
      throw new AuthenticationError(
        "401",
        "Ошибка аутентификации"
      )
    }

    const payload = jwt.verify(token, config.server.tokens.accessJWTSecret) as JwtPayload

    if (payload.userId) {
      const tokenFromDB = await Token.findOne({ where: { userId: payload.userId } })
      const user: User = await User.findOne({ where: { id: tokenFromDB.userId } })
      ctx.user = user
      return next()
    } else {
      throw new AuthenticationError(
        "401",
        "Ошибка аутентификации"
      )
    }
  } catch (error) {
    console.log(error)
    throw new AuthenticationError(
      "401",
      "Ошибка аутентификации"
    )
  }
}
