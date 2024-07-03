import { type Context, type DefaultState } from "koa"
import Router from "koa-router"
import { getById, list } from "@/routes/books/book.controller"

const router = new Router<DefaultState, Context>()

router.prefix("/books")

router.get("/", list)

router.get("/:id", getById)

export default router
