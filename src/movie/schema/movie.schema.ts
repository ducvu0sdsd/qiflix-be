import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface CategoryInterface {
    category_id: string;
    category_name: string;
}

export interface EpisodeInterface {
    indexOfEpisode: number;
    name: string;
    url: string;
}

export class Episode {
    @Prop()
    numberOfEpisodes: number;

    @Prop({ type: [{ type: 'string' }] })
    episodes: EpisodeInterface[];
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
    trailerUrl: string;

    @Prop({ default: [] })
    directors: string[];

    @Prop()
    yearRelease: number;

    @Prop({ type: Episode })
    listEpisode: Episode;

    @Prop({ default: [] })
    belong: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
