import { type Context } from "koa"

export interface IKoaContext extends Context {
    user?: IUserContext
}

export interface IUserContext {
    id: number
}
