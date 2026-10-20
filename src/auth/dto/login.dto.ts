import { Type } from "class-transformer"
import { IsEmail, IsString } from "class-validator"

export class LoginDto{

    @IsEmail()
    email!: string

    @Type(() => String)
    @IsString()
    password!: string
}