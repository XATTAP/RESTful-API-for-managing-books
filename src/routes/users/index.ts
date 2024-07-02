import { type Context, type DefaultState } from "koa"
import Router from "koa-router"
import { login } from "@/routes/users/user.controller"

const router = new Router<DefaultState, Context>()

router.prefix("/users")

router.post("/login", login)

export default router
