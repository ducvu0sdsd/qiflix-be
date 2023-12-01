import { Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import mongoose, { Model } from 'mongoose';
import { Movie } from './schema/movie.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MovieService {

    constructor(
        @InjectModel(Movie.name)
        private movieSchema: Model<Movie>
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
}
