import { Prop } from "@nestjs/mongoose"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Gender } from "../schema/user.schema"


export class UserCreateDto {

    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsEnum(Gender)
    readonly gender: Gender

    @IsNotEmpty()
    @IsString()
    readonly avatar: string

    readonly pin: string | undefined
}