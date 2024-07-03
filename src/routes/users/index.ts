import { type Context, type DefaultState } from "koa"
import Router from "koa-router"
import { login, me, register, updateRole, verify } from "@/routes/users/user.controller"
import checkAuth from "@/middlewares/checkAuth"
import checkRoles from "@/middlewares/checkRoles"
import { Role } from "@/utils"

const router = new Router<DefaultState, Context>()

router.prefix("/users")

router.post("/register", register)

router.get("/verify", verify)

router.post("/login", login)

router.get("/me", checkAuth, me)

router.put("/:id/role", checkAuth, checkRoles([Role.Admin]), updateRole)

export default router
