import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

interface EpisodeInterface {
    indexOfEpisode: number,
    name: string,
    url: string
}

@Schema({ timestamps: true })
class Episode {

    @Prop()
    movie_id: string

    @Prop()
    numberOfEpisodes: number

    @Prop()
    episodes: EpisodeInterface[]
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode)