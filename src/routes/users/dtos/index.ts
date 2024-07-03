import { ServerValidationError } from "@/utils/errors"
import { type ValidationArguments, IsDefined, IsString, IsEmail } from "class-validator"

export class IRegisterDTO {
  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  username: string

  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  password: string
  
  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  @IsEmail({}, {
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
          `Поле ${args.property}, должно иметь вид email`
      )
    }
  })
  email: string
}

export class ILoginDTO {
  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  username: string

  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  password: string
}

export class IUserVerifyDTO {
  emailToken: string
}
