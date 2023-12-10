import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { SubtitleService } from './subtitle.service';
import { Subtitle } from './schema/subtitle.schema';

@Controller('subtitles')
export class SubtitleController {

    constructor(
        private subtitleService: SubtitleService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('srtFile'))
    async insert(@UploadedFile() srtFile: Express.Multer.File, @Body() body: { movie_id: string, country: string, episode?: string }): Promise<Subtitle> {
        const res = await this.subtitleService.insert(srtFile, body.movie_id, body.country)
        return res
    }

    @Get(':id')
    async getAllSubtitleByMovie(@Param('id') id: string): Promise<Subtitle[]> {
        return await this.subtitleService.getAllByMovie(id);
    }
}