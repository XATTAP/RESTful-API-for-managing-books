import { IKoaContext } from "@/interfaces"
import { booksFactory } from "./book.service"

export const list = async (ctx: IKoaContext) => {
  ctx.body = await booksFactory().list()
}

export const getById = async (ctx: IKoaContext) => {
  ctx.body = await booksFactory().getById(ctx.params.id)
}
