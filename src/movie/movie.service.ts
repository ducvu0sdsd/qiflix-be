import { Injectable } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { Model } from 'mongoose';
import { Movie, Pagination } from './schema/movie.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieSchema: Model<Movie>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return await this.movieSchema.find().sort({ createdAt: -1 });
  }

  async delete(id: string): Promise<Movie> {
    return await this.movieSchema.findByIdAndDelete(id, { new: true });
  }

  async save(movie: MovieDto, id?: string): Promise<Movie> {
    if (id) {
      return await this.movieSchema.findByIdAndUpdate(
        id,
        { $set: movie },
        { new: true },
      );
    }
    return await this.movieSchema.create(movie);
  }

  async getBySlug(slug: string): Promise<Movie> {
    return await this.movieSchema.findOne({ url: slug }).lean();
  }

  async getMoviesByName(name: string): Promise<Movie[]> {
    const normalize = (str: string): string =>
      str.toLowerCase().replace(/[-'_,;:"? ]/g, '');

    const movies: Movie[] = await this.movieSchema.find();
    const isEmptyName = name.trim() === '';

    if (isEmptyName) {
      return movies;
    }

    const normalizedInput = normalize(name);

    return movies.filter((movie) => {
      const normalizedTitle = normalize(movie.title);
      return normalizedTitle.includes(normalizedInput);
    });
  }

  async getPagination(params: {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
  }): Promise<Pagination<Movie[]>> {
    const { page = 1, limit = 10, search = '', sort = 'title' } = params;

    const skip = (page - 1) * limit;

    // Build search query
    const query: any = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Sort processing
    const sortQuery: any = {};
    if (sort.startsWith('-')) {
      sortQuery[sort.substring(1)] = -1;
    } else {
      sortQuery[sort] = 1;
    }

    // Fetch data
    const [data, total] = await Promise.all([
      this.movieSchema
        .find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.movieSchema.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
