import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ObjectId } from 'mongoose';

export class WatchingDto {
  _id: ObjectId;

  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @IsNumber()
  @IsNotEmpty()
  episode: number;

  @IsString()
  @IsNotEmpty()
  account_id: string;

  @IsNumber()
  @IsNotEmpty()
  played: number;
}

export class UpdateWatchingDto extends PartialType(WatchingDto) {}

export class DeleteWatchingDto {
  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @IsString()
  @IsNotEmpty()
  account_id: string;
}
