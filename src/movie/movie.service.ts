import { Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { Model, Types } from 'mongoose';
import { Movie } from './schema/movie.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MovieWatchingByUserId } from './dto/movie-watching-by-user.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class MovieService {

    constructor(
        @InjectModel(Movie.name)
        private movieSchema: Model<Movie>,
        @InjectModel(User.name)
        private userSchema: Model<User>
    ) { }

    async create(movie: MovieDto): Promise<Movie> {
        return this.movieSchema.create(movie)
    }
    async getAll(): Promise<Movie[]> {
        return this.movieSchema.find()
    }

    async delete(id: string): Promise<Movie> {
        return this.movieSchema.findByIdAndDelete(id, { new: true })
    }

    async update(id: string, movie: MovieDto): Promise<Movie> {
        return this.movieSchema.findByIdAndUpdate(id, movie, { new: true })
    }

    async getMoviesWatchingByUserId(id: string): Promise<MovieWatchingByUserId[]> {
        const movies: MovieWatchingByUserId[] = []
        const aggregationPipeline = [{ $match: { _id: new Types.ObjectId(id) } }, { $unwind: '$watching' }, { $addFields: { movieObjectId: { $toObjectId: '$watching.movie_id' } } }, { $lookup: { from: 'movies', localField: 'movieObjectId', foreignField: '_id', as: 'movie' } }, { $unwind: '$movie' }, { $addFields: { watching: { $mergeObjects: ['$watching', '$movie'] } } }, { $group: { _id: '$_id', moviesWatching: { $push: '$watching' } } }, { $project: { _id: 0 } }, { $unwind: '$moviesWatching' }, { $replaceRoot: { newRoot: '$moviesWatching' } }, { $project: { movie_id: 0 } }];
        let res = await this.userSchema.aggregate(aggregationPipeline).exec();
        res = res.map(item => {
            const { indexOfEpisode, currentTime, process, ...movie } = item
            const movie_item: MovieWatchingByUserId = { indexOfEpisode, currentTime, process: process ? process : 0, movie: movie }
            return movie_item
        })
        return res;
    }
    // ObjectId("656b0f53f857a7f173d3b18d")
    async getMoviesLikedByUserId(id: string): Promise<Movie[]> {
        const aggregatePipeline = [
            { $match: { _id: new Types.ObjectId(id) } },
            { $unwind: '$liked' },
            { $addFields: { movieLiked: { $toObjectId: '$liked' } } },
            { $lookup: { from: 'movies', localField: 'movieLiked', foreignField: '_id', as: 'movie' } },
            { $unwind: '$movie' },
            { $group: { _id: '$_id', movies: { $push: '$movie' } } },
            { $project: { _id: 0 } },
            { $unwind: "$movies" },
            { $replaceRoot: { newRoot: '$movies' } }]

        const movies: Movie[] = await this.userSchema.aggregate(aggregatePipeline).exec()
        return movies
    }

    async getMoviesByCountryAndName(country : string, name : string) : Promise<Movie[]> {
        let aggregatePipeline = [{}]
        const movies: Movie[] = await this.movieSchema.find()
        const results = []
        if (name === '' && country === 'Country') {
            return movies
        }
        movies.forEach(movie => {
            const title = movie.title.toLowerCase()
                .replaceAll('-', '')
                .replaceAll("'", '')
                .replaceAll(',', '')
                .replaceAll('_', '')
                .replaceAll(' ', '')
                .replaceAll(';', '')
                .replaceAll(':', '')
                .replaceAll('"', '')
                .replaceAll('?', '')
            const titleInput = name.toLowerCase()
                .replaceAll('-', '')
                .replaceAll("'", '')
                .replaceAll(',', '')
                .replaceAll('_', '')
                .replaceAll(' ', '')
                .replaceAll(';', '')
                .replaceAll(':', '')
                .replaceAll('"', '')
                .replaceAll('?', '')
            if (name !== '' && country !== 'Country') {
                if (title.includes(titleInput) && movie.country === country) {
                    results.push(movie)
                }
            } else if (name === '' && country !== 'Country') {
                if (movie.country === country) {
                    results.push(movie)
                }
            } else if (name !== '' && country === 'Country') {
                if (title.includes(titleInput)) {
                    results.push(movie)
                }
            }
        })
        return results;
    }
}
