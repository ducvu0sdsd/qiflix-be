import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WatchingSchema } from './schema/watching.schema';
import { WatchingController } from './watching.controller';
import { WatchingService } from './watching.service';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Watching', schema: WatchingSchema }]),
    MovieModule,
  ],
  controllers: [WatchingController],
  providers: [WatchingService],
})
export class WatchingModule {}
