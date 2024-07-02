import { Sequelize, type SequelizeOptions } from "sequelize-typescript"
import config from "@/config"
import { SequelizeStorage, Umzug } from "umzug"

    const sequelizeOptions: SequelizeOptions = {
      dialect: "postgres",
      host: config.postgres.host,
      port: config.postgres.port,
      username: config.postgres.user,
      password: config.postgres.password,
      database: config.postgres.db,
      logging: false,
      models: [__dirname + "/models/**.model.**"]
    }

export const sequelize = new Sequelize(sequelizeOptions)

export const seeders = new Umzug({
  migrations: {
    glob: ["seeders/*", { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    tableName: "SeedersMeta"
  }),
  logger: console
})

export const connectDB = async (count = 0) => {
  count += 1
  sequelize
    .authenticate()
    .then(async () => {
      console.log("connect db success", sequelize.config.database)
      if (config.env !== "production" && process.env.FORCE_DB === "true") {
        await sequelize.sync({ force: true })
        await seeders.runAsCLI(["up"])
      } else {
        await sequelize.sync()
      }
      if (process.env.MIGRATE_OPTION) {
        await seeders.runAsCLI([process.env.MIGRATE_OPTION])
      }
    })
    .catch((error) => {
      if (count <= 10) {
        setTimeout(async () => {
          await connectDB(count)
        }, 1000)
      }
      console.log("error connect db:", error.message)
    })
}
