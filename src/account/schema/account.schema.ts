import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum StepVerify {
    STEP_1 = "Step 1",
    STEP_2 = "Step 2",
    STEP_3 = "Step 3",
    SUCCESS = "Success"
}

@Schema({ timestamps: true })
export class Account {

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    fullname: string

    @Prop()
    phone: string

    @Prop()
    address: string

    @Prop()
    verify: StepVerify

    @Prop()
    admin: boolean
}

export const AccountSchema = SchemaFactory.createForClass(Account)