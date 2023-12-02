import { Movie } from "../schema/movie.schema"


export class MovieWatchingByUserId {
    readonly movie: Movie
    readonly indexOfEpisode: number
    readonly currentTime: number
}