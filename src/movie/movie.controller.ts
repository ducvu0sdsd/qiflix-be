import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './schema/movie.schema';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  async save(@Body() movie: MovieDto): Promise<Movie> {
    return this.movieService.save(movie, movie._id);
  }

  @Get()
  async getAll(): Promise<Movie[]> {
    return this.movieService.getAll();
  }

  @Get('pagination')
  async getMovies(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('sort') sort: string,
  ) {
    return this.movieService.getPagination({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search,
      sort,
    });
  }

  @Get(':slug')
  async getbySlug(@Param('slug') slug: string): Promise<Movie> {
    return this.movieService.getBySlug(slug);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Movie> {
    return this.movieService.delete(id);
  }

  @Get('get-movies-by-name/:name')
  async getMoviesByCountryAndName(
    @Param('name') name: string,
  ): Promise<Movie[]> {
    return this.movieService.getMoviesByName(name);
  }
}
