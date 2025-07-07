// src/vocabulary/vocabulary.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { VocabularySchema } from './schema/vocabulary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Vocabulary', schema: VocabularySchema },
    ]),
  ],
  controllers: [VocabularyController],
  providers: [VocabularyService],
})
export class VocabularyModule {}
