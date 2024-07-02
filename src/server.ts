import Koa from "koa"
import cors from "@koa/cors"
import bodyParser from "koa-body"
import errorMiddleware from "@/middlewares/errorMiddleware"
import path from "path"
import routes from "@/routes"

const app = new Koa()

app.use(
  bodyParser({
    text: false,
    json: true,
    patchNode: true,
    patchKoa: true,
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "/public/uploads/"),
      keepExtensions: true
    }
  })
)

const corsOptions = {
  origin: "*",
  credentials: true
}

app.use(cors(corsOptions))

app.use(errorMiddleware)

app.use(routes.routes())
  .use(routes.allowedMethods())

export default app
