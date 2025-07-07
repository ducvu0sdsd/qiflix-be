import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyDto } from './dto/create-vocabulary.dto';
import { Vocabulary } from './schema/vocabulary.schema';

@Controller('vocabularies')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Post()
  async save(
    @Body() dto: VocabularyDto & { _id?: string },
  ): Promise<Vocabulary> {
    return this.vocabularyService.save(dto, dto._id);
  }

  @Get()
  async findByPage(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search = '',
    @Query('sort') sort = '-createdAt',
  ) {
    return this.vocabularyService.getByPage({
      page: Number(page),
      limit: Number(limit),
      search,
      sort,
    });
  }

  @Get('all')
  findAll() {
    return this.vocabularyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocabularyService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.vocabularyService.delete(id);
  }
}
