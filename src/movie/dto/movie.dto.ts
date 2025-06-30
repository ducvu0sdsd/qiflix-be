import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EpisodeList } from '../schema/movie.schema';

export class MovieDto {
  _id: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  readonly genres: string[];

  @IsNotEmpty()
  readonly actors: string[];

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly trailerUrl: string;

  @IsNotEmpty()
  readonly directors: string[];

  @IsNotEmpty()
  @IsNumber()
  readonly yearRelease: number;

  readonly listEpisode: EpisodeList;

  @IsNotEmpty()
  readonly belong: string[];
}
