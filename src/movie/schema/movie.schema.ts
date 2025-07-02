import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export interface CategoryInterface {
  category_id: string;
  category_name: string;
}

export interface Pagination<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface EpisodeInterface {
  indexOfEpisode: number;
  name: string;
  url: string;
  thumbnail: string;
  duration: string;
  like: number;
  view: number;
}

export class Episode {
  @Prop()
  indexOfEpisode: number;
  @Prop()
  name: string;
  @Prop()
  url: string;
  @Prop()
  thumbnail: string;
  @Prop()
  duration: number;
  @Prop({ default: 0 })
  like: number;
  @Prop({ default: 0 })
  view: number;
}

export class EpisodeList {
  @Prop()
  numberOfEpisodes: number;

  @Prop({ type: [{ type: 'string' }] })
  episodes: Episode[];
}

@Schema({
  timestamps: true,
})
export class Movie {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  country: string;

  @Prop({ default: [] })
  genres: string[];

  @Prop({ default: [] })
  actors: string[];

  @Prop()
  url: string;

  @Prop()
  thumbnail: string;

  @Prop()
  thumbnailVertical: string;

  @Prop()
  trailerUrl: string;

  @Prop({ default: [] })
  directors: string[];

  @Prop()
  yearRelease: number;

  @Prop({ type: EpisodeList })
  listEpisode: EpisodeList;

  @Prop({ default: [] })
  belong: string[];

  _id?: Types.ObjectId;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
