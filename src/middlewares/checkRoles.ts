import { type IKoaContext } from "@/interfaces/index"
import { type Next } from "koa"
import { ForbiddenError } from "@/utils/errors"
import { Role } from "@/utils"

export default (roles: Role[]) => async (ctx: IKoaContext, next: Next) => {
  try {
    for (const role of roles) {
      if (ctx.user.role & role) {
        return next()
      }
    }
    throw new ForbiddenError(
      "403",
      "Недостаточно прав для выполнения действия"
    )
  } catch (error) {
    console.log(error)
    throw new ForbiddenError(
      "403",
      "Недостаточно прав для выполнения действия"
    )
  }
}
