import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './schema/comment.schema';
import { CommentGetAllDto } from './dto/comment-get-all.dto';

@Controller('comments')
export class CommentController {

    constructor(
        private commentService: CommentService
    ) { }

    @Post()
    async insert(@Body() body: CommentDto): Promise<Comment> {
        const res = await this.commentService.insert(body)
        return res;
    }

    @Get(':id')
    async getAllByMovie(@Param('id') id: string): Promise<Record<string, object>[]> {
        return await this.commentService.getAllCommentByMovie(id);
    }
}
