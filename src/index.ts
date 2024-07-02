import config from "@/config"
import app from "@/server"
import { connectDB } from "@/db/sequelize"

app.listen(config.server.port, () => {
  console.log(`Server started on ${config.server.host}`)
  connectDB()
})
