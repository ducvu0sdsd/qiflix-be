import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './schema/movie.schema';
import { MovieWatchingByUserId } from './dto/movie-watching-by-user.dto';

@Controller('movies')
export class MovieController {

    constructor(
        private movieService: MovieService
    ) { }

    @Post()
    async create(@Body() movie: MovieDto): Promise<Movie> {
        console.log(movie)
        return this.movieService.create(movie)
    }

    @Get()
    async getAll(): Promise<Movie[]> {
        return this.movieService.getAll()
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() movie: MovieDto): Promise<Movie> {
        return this.movieService.update(id, movie)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Movie> {
        return this.movieService.delete(id)
    }

    @Get('get-movies-watching-by-user/:id')
    async getMoviesWatchingByUser(@Param('id') id: string): Promise<MovieWatchingByUserId[]> {
        return this.movieService.getMoviesWatchingByUserId(id)
    }

    @Get('get-movies-liked-by-user/:id')
    async getMoviesLinkedByUser(@Param('id') id: string): Promise<Movie[]> {
        return this.movieService.getMoviesLikedByUserId(id)
    }
}
