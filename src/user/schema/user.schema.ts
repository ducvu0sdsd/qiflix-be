import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export interface WatchingInterface {
    movie_id: string
    indexOfEpisode: number
    currentTime: number
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

@Schema({ timestamps: true })
export class User {
    @Prop()
    @IsString()
    @IsNotEmpty()
    name: string

    @Prop()
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender

    @Prop()
    @IsString()
    @IsNotEmpty()
    avatar: string

    @Prop()
    @IsString()
    @IsNotEmpty()
    account_id: string

    @Prop({ type: String, default: null })
    pin: string | null;

    @Prop({ default: [] })
    watching: WatchingInterface[]

    @Prop({ default: [] })
    liked: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)