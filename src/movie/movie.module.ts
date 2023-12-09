import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './schema/movie.schema';
import { UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]), MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule { }
