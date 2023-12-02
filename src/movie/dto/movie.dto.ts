import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Episode } from "../schema/movie.schema"


export class MovieDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsString()
    readonly country: string

    @IsNotEmpty()
    readonly genres: string[]

    @IsNotEmpty()
    readonly actors: string[]

    @IsNotEmpty()
    @IsString()
    readonly url: string

    @IsNotEmpty()
    @IsString()
    readonly thumbnail: string

    @IsNotEmpty()
    @IsString()
    readonly trailerUrl: string

    @IsNotEmpty()
    readonly directors: string[]

    @IsNotEmpty()
    @IsNumber()
    readonly yearRelease: number

    readonly listEpisode: Episode

    @IsNotEmpty()
    readonly belong: string[]
}