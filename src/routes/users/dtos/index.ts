import { ServerValidationError } from "@/utils/errors"
import { type ValidationArguments, IsDefined, IsString } from "class-validator"

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
