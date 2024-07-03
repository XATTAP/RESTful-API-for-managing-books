import { GenreName } from "@/utils"
import { ServerValidationError } from "@/utils/errors" 
import { type ValidationArguments, IsString, IsDate, IsEnum, IsOptional, IsArray, IsDefined } from "class-validator"

export class IUpdateBookDTO {
  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  title?: string

  @IsOptional()
  @IsString({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался string`
      )
    }
  })
  author?: string

  @IsOptional()
  @IsDate({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался date`
      )
    }
  })
  publicationDate?: Date

  @IsOptional()
  @IsArray({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался массив`
      )
    }
  })
  @IsEnum(GenreName, {
    each: true,
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Поле ${args.property} не является одним из доступных жанров`
      )
    }
  })
  genres?: GenreName[]
}

export class ICreateBookDTO {
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
  title: string

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
  author: string

  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsDate({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался date`
      )
    }
  })
  publicationDate: Date

  @IsDefined({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Отсутствует обязательное поле ${args.property}`
      )
    }
  })
  @IsArray({
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Неверный формат поля ${args.property}, ожидался массив`
      )
    }
  })
  @IsEnum(GenreName, {
    each: true,
    message: (args: ValidationArguments) => {
      throw new ServerValidationError(
        "400",
        `Поле ${args.property} не является одним из доступных жанров`
      )
    }
  })
  genres: GenreName[]
}