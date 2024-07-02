import dotenv from "dotenv"
dotenv.config()

const env = process.env.NODE_ENV || "development"
const port = process.env.SERVER_PORT || 4000

const config = {
  env,
  server: {
    host: process.env.SERVER_HOST || `http://localhost:${port}`,
    port,
    tokens: {
      accessJWTSecret: process.env.ACCESS_JWT_SECRET || "accessJWTSecret!",
      refreshJWTSecret: process.env.REFRESH_JWT_SECRET || "refreshJWTSecret!"
    }
  },
  postgres: {
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    db: process.env.PG_DATABASE || "postgres",
    timezone: "+00:00"
  }
}

export default config
