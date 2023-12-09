import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './schema/comment.schema';
import { CommentGetAllDto } from './dto/comment-get-all.dto';

@Injectable()
export class CommentService {

    constructor(
        @InjectModel(Comment.name)
        private commentSchema: mongoose.Model<Comment>
    ) { }

    async insert(c: CommentDto): Promise<Comment> {
        const res = await this.commentSchema.create(c)
        return res;
    }

    async getAllCommentByMovie(id: string): Promise<Record<string, object>[]> {
        const aggregatePipeline = [
            { $match: { movie_id: id } },
            { $addFields: { user_object_id: { $toObjectId: '$user_id' } } },
            { $lookup: { from: 'users', localField: 'user_object_id', foreignField: '_id', as: 'user' } },
            { $unwind: '$user' },
            { $project: { _id: 1, movie_id: 1, content: 1, 'user._id': 1, 'user.name': 1, 'user.avatar': 1, updatedAt: 1 } }]

        const res = await this.commentSchema.aggregate(aggregatePipeline).exec()
        console.log(res)
        return res;
    }

}
