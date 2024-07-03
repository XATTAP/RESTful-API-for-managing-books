import Router from "koa-router"
import { type Context, type DefaultState } from "koa"
import userRoutes from "@/routes/users"
import bookRoutes from "@/routes/books"

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
router.use(bookRoutes.routes())

if (process.env.CONSOLE_URL === "true") {
  console.log("available routes:")
  let i = 0
  router.stack.forEach((r) => {
    if (r.methods && (!r.path.includes("[^/]"))) {
      console.log(`${++i}. ${r.methods} url = ${r.path} `)
    }
  })
}

export default router
