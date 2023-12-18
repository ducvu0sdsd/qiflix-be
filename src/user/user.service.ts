import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, WatchingInterface } from './schema/user.schema';
import { UserCreateDto } from './dto/user-create.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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

    async addLiked(id: string, movie_id: string): Promise<User> {
        const user = await this.userSchema.findById(id)
        if (user) {
            const isLiked = user.liked.includes(movie_id)
            if (!isLiked) {
                user.liked.unshift(movie_id)
            }
            const res = this.userSchema.findByIdAndUpdate(id, { liked: user.liked }, { new: true })
            return res
        } else {
            throw new UnauthorizedException('Not Found User')
        }
    }

    async removeLiked(id: string, movie_id: string): Promise<User> {
        const user = await this.userSchema.findById(id)
        if (user) {
            const liked = user.liked.filter(item => item !== movie_id)
            const res = this.userSchema.findByIdAndUpdate(id, { liked }, { new: true })
            return res
        } else {
            throw new UnauthorizedException('Not Found User')
        }
    }

    async updateWatching(id: string, watching: WatchingInterface): Promise<User> {
        const user = await this.userSchema.findById(id)
        if (user) {
            const watchingFilter = user.watching.filter(item => item.movie_id === watching.movie_id)[0]
            const watchings = user.watching.filter(item => item.movie_id !== watching.movie_id)
            if (watchingFilter) {
                watchingFilter.indexOfEpisode = watching.indexOfEpisode
                watchingFilter.currentTime = watching.currentTime
                watchingFilter.process = watching.process
                watchings.unshift(watchingFilter)
            } else {
                watchings.unshift(watching)
            }
            return await this.userSchema.findByIdAndUpdate(id, { watching: watchings })
        } else {
            throw new UnauthorizedException('Not Found User')
        }
    }

    async deleteWatching(id: string, watching: WatchingInterface): Promise<void> {
        const user = await this.userSchema.findById(id)
        if (user) {
            const watchingFilter = user.watching.filter(item => item.movie_id !== watching.movie_id)
            await this.userSchema.findByIdAndUpdate(id, { watching: watchingFilter })
        } else {
            throw new UnauthorizedException('Not Found User')
        }
    }

    async update(userDto: UserCreateDto, id: string): Promise<User> {
        return await this.userSchema.findByIdAndUpdate(id, userDto, { new: true })
    }
}
