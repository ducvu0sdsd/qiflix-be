import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class Comment {

    @Prop()
    movie_id: string

    @Prop()
    content: string

    @Prop()
    user_id: string

}

export const CommentSchema = SchemaFactory.createForClass(Comment)