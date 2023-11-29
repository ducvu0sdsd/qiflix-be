import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export interface CategoryInterface {
    category_id: string,
    category_name: string
}

@Schema({
    timestamps: true
})

class Movie {

    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    country: string

    @Prop()
    category: CategoryInterface

    @Prop()
    actors: string[]

    @Prop()
    url: string

    @Prop()
    thumbnail: string

    @Prop()
    trailerUrl: string

    @Prop()
    directors: string[]

    @Prop()
    yearRelease: number

}

export const MovieSchema = SchemaFactory.createForClass(Movie)