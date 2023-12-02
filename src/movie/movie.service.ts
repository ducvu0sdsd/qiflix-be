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
            const { indexOfEpisode, currentTime, ...movie } = item
            const movie_item: MovieWatchingByUserId = { indexOfEpisode, currentTime, movie: movie }
            return movie_item
        })
        return res;
    }
}
