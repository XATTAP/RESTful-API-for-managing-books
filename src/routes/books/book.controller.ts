import { IKoaContext } from "@/interfaces"
import { booksFactory } from "@/routes/books/book.service"
import { ICreateBookDTO, IUpdateBookDTO } from "@/routes/books/dtos"
import { ServerValidationError } from "@/utils/errors"
import { transformAndValidate } from "class-transformer-validator"

export const list = async (ctx: IKoaContext) => {
  ctx.body = await booksFactory().list()
}

export const getById = async (ctx: IKoaContext) => {
  ctx.body = await booksFactory().getById(ctx.params.id)
}

export const deleteById = async (ctx: IKoaContext) => {
  ctx.body = await booksFactory().deleteById(ctx.params.id)
}

export const create = async (ctx: IKoaContext) => {
  const body: ICreateBookDTO = ctx.request.body
  body.publicationDate = new Date(body.publicationDate)

  await transformAndValidate(ICreateBookDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )
  ctx.body = await booksFactory().create(body)
}

export const updateById = async (ctx: IKoaContext) => {
  const body: IUpdateBookDTO = ctx.request.body
  body.publicationDate = new Date(body.publicationDate)

  await transformAndValidate(IUpdateBookDTO, body).catch(
    (err: ServerValidationError) => {
      throw new ServerValidationError(err.errorCode, err.message)
    }
  )
  ctx.body = await booksFactory().updateById(ctx.params.id, body)
}