import { type IKoaContext } from "@/interfaces"
import { ServerValidationError } from "@/utils/errors"
import { usersFactory } from "@/routes/users/user.service"
import { transformAndValidate } from "class-transformer-validator"
import { ILoginDTO } from "@/routes/users/dtos/index"

export const login = async (ctx: IKoaContext) => {
  const body: ILoginDTO = ctx.request.body

  await transformAndValidate(ILoginDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )
  ctx.body = await usersFactory().login(ctx, body)
}

export const me = async (ctx: IKoaContext) => {
  ctx.body = ctx.user
}
