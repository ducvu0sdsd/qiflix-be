// src/vocabulary/dto/create-vocabulary.dto.ts

import { difficultyLevels, PartOfSpeech } from '../schema/vocabulary.schema';

export class VocabularyDto {
  _id?: string;
  word: string;
  translation: string;
  example: string;
  partOfSpeech: PartOfSpeech;
  difficulty: difficultyLevels;
}
