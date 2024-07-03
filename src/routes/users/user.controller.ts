import { type IKoaContext } from "@/interfaces"
import { ServerValidationError } from "@/utils/errors"
import { usersFactory } from "@/routes/users/user.service"
import { transformAndValidate } from "class-transformer-validator"
import { ILoginDTO, IRegisterDTO, IUpdateRoleDTO, IUserVerifyDTO } from "@/routes/users/dtos/index"

export const register = async (ctx: IKoaContext) => {
  const body: IRegisterDTO = ctx.request.body

  await transformAndValidate(IRegisterDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )
  ctx.body = await usersFactory().register(body)
}

export const login = async (ctx: IKoaContext) => {
  const body: ILoginDTO = ctx.request.body

  await transformAndValidate(ILoginDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )
  ctx.body = await usersFactory().login(ctx, body)
}

export const verify = async (ctx: IKoaContext) => {
  const query = ctx.query as unknown as IUserVerifyDTO
  ctx.body = await usersFactory().verify(query)
}

export const me = async (ctx: IKoaContext) => {
  ctx.body = ctx.user
}

export const updateRole = async (ctx: IKoaContext) => {
  const body: IUpdateRoleDTO = ctx.request.body

  await transformAndValidate(IUpdateRoleDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )
  ctx.body = await usersFactory().updateRole(ctx.params.id, body)
}
