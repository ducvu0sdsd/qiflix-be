import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type AccountDocument = Account & Document;

export enum StepVerify {
  STEP_1 = 'Step 1',
  STEP_2 = 'Step 2',
  STEP_3 = 'Step 3',
  SUCCESS = 'Success',
}

@Schema({ timestamps: true })
export class Account {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({
    default: 'https://avatars.githubusercontent.com/u/124599',
  })
  avatar: string;

  @Prop({
    type: {
      emailVerified: { type: Boolean, default: false },
      verifyCode: { type: String, default: '' },
    },
    _id: false,
  })
  auth: {
    emailVerified: boolean;
    verifyCode: string;
  };

  // Optional fields from your second version
  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop({ enum: StepVerify, default: StepVerify.STEP_1 })
  verify?: StepVerify;

  @Prop({ default: false })
  admin?: boolean;

  _id?: ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
