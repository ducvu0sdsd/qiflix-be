import { Injectable, UnauthorizedException } from '@nestjs/common';
import { handleSRTFile } from 'src/utils';
import { Subtitle, SubtitleItemInterface } from './schema/subtitle.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SubtitleService {

    constructor(
        @InjectModel(Subtitle.name)
        private subtitleSchema: Model<Subtitle>
    ) { }

    async insert(srtFile: Express.Multer.File, movie_id: string, country: string, episode?: string): Promise<Subtitle> {
        try {
            if (!srtFile) {
                throw new UnauthorizedException('No file provided')
            }
            const { originalname, buffer } = srtFile;
            const srtContent = buffer.toString('utf-8');
            const subtitles: SubtitleItemInterface[] = handleSRTFile(srtContent)
            let episodeNumber = 0
            if (episode) {
                episodeNumber = parseInt(episode)
            }
            const result: Subtitle = { subtitles, country, movie_id, episode: episodeNumber }
            if (result.subtitles.length === 0) {
                throw new UnauthorizedException("Fail")
            }
            const res = await this.subtitleSchema.create(result)
            return res
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }

    async getAllByMovie(id: string): Promise<Subtitle[]> {
        const aggregatePipeline = [{ $match: { movie_id: id } }]
        const res: Subtitle[] = await this.subtitleSchema.aggregate(aggregatePipeline).exec()
        return res
    }
}
