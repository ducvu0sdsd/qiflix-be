import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export interface SubtitleItemInterface {
    id: number,
    firstTime: number,
    lastTime: number,
    content: string
}

@Schema({
    timestamps: true,
})
export class Subtitle {

    @Prop()
    country: string

    @Prop()
    movie_id: string

    @Prop()
    episode?: number

    @Prop()
    subtitles: SubtitleItemInterface[]
}

export const SubtitleSchema = SchemaFactory.createForClass(Subtitle)