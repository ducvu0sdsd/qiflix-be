import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schema/movie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule { }
