import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateWatchingDto {
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

export class UpdateWatchingDto extends PartialType(CreateWatchingDto) {}

export class DeleteWatchingDto {
  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @IsString()
  @IsNotEmpty()
  account_id: string;
}
