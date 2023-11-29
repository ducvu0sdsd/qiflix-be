import { Schema, SchemaFactory } from "@nestjs/mongoose";

interface WatchingInterface {
    movie_id: string
    indexOfEpisode: number
    currentTime: number
}

@Schema({ timestamps: true })
class User {
    name: string
    gender: string
    pin: string | undefined
    watching: WatchingInterface[]
    liked: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)