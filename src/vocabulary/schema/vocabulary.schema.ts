// src/vocabulary/schemas/vocabulary.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum difficultyLevels {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum PartOfSpeech {
  Noun = 'noun',
  Pronoun = 'pronoun',
  Verb = 'verb',
  Adjective = 'adjective',
  Adverb = 'adverb',
  Preposition = 'preposition',
  Conjunction = 'conjunction',
  Interjection = 'interjection',
  Determiner = 'determiner',
}

@Schema({ timestamps: true })
export class Vocabulary extends Document {
  @Prop({ required: true, trim: true })
  word: string;

  @Prop({ required: true })
  translation: string;

  @Prop({ required: true })
  example: string;

  @Prop({ required: true, type: [String], enum: Object.values(PartOfSpeech) })
  partOfSpeech: PartOfSpeech[];

  @Prop({ required: true, enum: Object.values(difficultyLevels) })
  difficulty: difficultyLevels;
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
