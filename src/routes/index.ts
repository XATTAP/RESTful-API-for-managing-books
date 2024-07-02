import Router from "koa-router"
import { type Context, type DefaultState } from "koa"
import userRoutes from "@/routes/users"

const router = new Router<DefaultState, Context>()

router.use(async (ctx, next) => {
  ctx.set("Pragma", "no-cache")
  ctx.set("Cache-Control", "no-cache, no-store")
  try {
    await next()
  } catch (error) {
    throw error
  }
})

router.prefix("/api")

router.get("/", (ctx) => {
  ctx.body = "Server is running"
})

router.use(userRoutes.routes())

export default router
