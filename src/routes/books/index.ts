import { type Context, type DefaultState } from "koa"
import Router from "koa-router"
import { create, deleteById, getById, list, updateById } from "@/routes/books/book.controller"
import checkAuth from "@/middlewares/checkAuth"
import checkRoles from "@/middlewares/checkRoles"
import { Role } from "@/utils"

const router = new Router<DefaultState, Context>()

router.prefix("/books")

router.get("/", list)

router.post("/", checkAuth, checkRoles([Role.Admin]), create)

router.get("/:id", getById)

router.put("/:id", checkAuth, checkRoles([Role.Admin]), updateById)

router.del("/:id", checkAuth, checkRoles([Role.Admin]), deleteById)

export default router
