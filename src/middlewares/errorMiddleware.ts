import { type IKoaContext } from "@/interfaces/index"
import { type Next } from "koa"

export default async (ctx: IKoaContext, next: Next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      error: err.errorCode,
      message: err.message || "Bad request",
      stack: err.stack,
      type: err.type || err.name
    }
    ctx.app.emit("error", err, ctx)
  }
}
