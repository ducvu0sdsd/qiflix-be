import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface WatchingInterface {
  movie_id: string;
  indexOfEpisode: number;
  currentTime: number;
  process?: number;
}

@Schema({ timestamps: true })
export class Watching {
  @Prop()
  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @Prop()
  @IsNumber()
  episode: number;

  @Prop()
  @IsString()
  @IsNotEmpty()
  account_id: string;

  @Prop()
  @IsNumber()
  played: number;
}

export const WatchingSchema = SchemaFactory.createForClass(Watching);
