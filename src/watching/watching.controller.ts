import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { WatchingService } from './watching.service';
import { WatchingDto, UpdateWatchingDto } from './dto/watching.dto';

@Controller('watching')
export class WatchingController {
  constructor(private readonly watchingService: WatchingService) {}

  // POST /watching
  @Post()
  async save(@Body() dto: WatchingDto) {
    return this.watchingService.save(dto);
  }

  // GET /watching
  @Get()
  async findAll() {
    return this.watchingService.findAll();
  }

  // GET /watching/:id
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.watchingService.findById(id);
  }

  // PATCH /watching/:id
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateWatchingDto) {
    return this.watchingService.update(id, dto);
  }

  // DELETE /watching/:id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.watchingService.delete(id);
  }

  // GET /watching/account/:accountId
  @Get('account/:accountId')
  async findByAccount(@Param('accountId') accountId: string) {
    const result = await this.watchingService.findWatchingsByAccount(accountId);
    return result;
  }

  // GET /watching/account/:accountId/movie/:movieId
  @Get('account/:accountId/movie/:movieId')
  async findByAccountAndMovie(
    @Param('accountId') accountId: string,
    @Param('movieId') movieId: string,
  ) {
    const result = await this.watchingService.findByAccountAndMovie(
      accountId,
      movieId,
    );
    if (!result) {
      throw new NotFoundException(
        `No watching found for account_id: ${accountId} and movie_id: ${movieId}`,
      );
    }
    return result;
  }

  // DELETE /watching/account/:accountId/movie/:movieId
  @Delete('account/:accountId/movie/:movieId')
  async deleteByAccountAndMovie(
    @Param('accountId') accountId: string,
    @Param('movieId') movieId: string,
  ) {
    const result = await this.watchingService.deleteByAccountAndMovie(
      accountId,
      movieId,
    );
    if (!result.deleted) {
      throw new NotFoundException(
        `No watching found to delete for account_id: ${accountId} and movie_id: ${movieId}`,
      );
    }
    return result;
  }
}
