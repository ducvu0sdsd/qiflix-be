import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

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

  _id?: Types.ObjectId;
}

export const WatchingSchema = SchemaFactory.createForClass(Watching);
