import { IsNotEmpty, IsString } from "class-validator"


export class CommentDto {
    @IsNotEmpty()
    @IsString()
    readonly movie_id: string

    @IsNotEmpty()
    @IsString()
    readonly content: string

    @IsNotEmpty()
    @IsString()
    readonly user_id: string
}