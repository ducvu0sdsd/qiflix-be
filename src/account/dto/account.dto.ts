import { IsNotEmpty, IsString, IsBoolean, IsEnum } from "class-validator"
import { StepVerify } from "../schema/account.schema"


export class AccountDto {

    @IsNotEmpty()
    @IsString()
    readonly fullname: string

    @IsNotEmpty()
    @IsString()
    readonly phone: string

    @IsNotEmpty()
    @IsString()
    readonly address: string

    @IsNotEmpty()
    @IsEnum(StepVerify)
    readonly verify: StepVerify

}