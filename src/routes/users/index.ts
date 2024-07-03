import { type Context, type DefaultState } from "koa"
import Router from "koa-router"
import { login, me, register, verify } from "@/routes/users/user.controller"
import checkAuth from "@/middlewares/checkAuth"

const router = new Router<DefaultState, Context>()

router.prefix("/users")

router.post("/register", register)

router.get("/verify", verify)

router.post("/login", login)

router.get("/me", checkAuth, me)

export default router
