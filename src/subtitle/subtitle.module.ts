import { Module } from '@nestjs/common';
import { SubtitleController } from './subtitle.controller';
import { SubtitleService } from './subtitle.service';
import { SubtitleSchema } from './schema/subtitle.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Subtitle', schema: SubtitleSchema }])],
  controllers: [SubtitleController],
  providers: [SubtitleService]
})
export class SubtitleModule { }
