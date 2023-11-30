import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userSchema: mongoose.Model<User>
    ) { }

    async create(user: User): Promise<User> {
        return await this.userSchema.create(user)
    }

    async getAllByUserID(id: string): Promise<User[]> {
        return await this.userSchema.find({ account_id: id })
    }

    async delete(id: string): Promise<User> {
        return await this.userSchema.findByIdAndDelete(id, {
            new: false
        })
    }
}
