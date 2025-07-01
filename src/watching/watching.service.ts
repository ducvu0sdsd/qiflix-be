import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Watching } from './schema/watching.schema';
import { UpdateWatchingDto, WatchingDto } from './dto/watching.dto';

@Injectable()
export class WatchingService {
  constructor(
    @InjectModel(Watching.name)
    private readonly watchingModel: Model<Watching>,
  ) {}

  // Create or Update
  async save(watching: WatchingDto): Promise<Watching> {
    const watchingFounded = await this.findByAccountAndMovie(
      watching.account_id,
      watching.movie_id,
    );
    if (watchingFounded) {
      return await this.update(watchingFounded._id.toString(), watching);
    }
    const created = new this.watchingModel(watching);
    return await created.save();
  }

  // Find all (optional pagination)
  async findAll(): Promise<Watching[]> {
    return await this.watchingModel.find().exec();
  }

  // Find one by ID
  async findById(id: string): Promise<Watching> {
    const record = await this.watchingModel.findById(id).exec();
    if (!record)
      throw new NotFoundException(`Watching record with ID ${id} not found`);
    return record;
  }

  // Update by ID
  async update(id: string, updateDto: UpdateWatchingDto): Promise<Watching> {
    const updated = await this.watchingModel
      .findByIdAndUpdate(id, updateDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updated)
      throw new NotFoundException(`Watching record with ID ${id} not found`);
    return updated;
  }

  // Delete by ID
  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.watchingModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new NotFoundException(`Watching record with ID ${id} not found`);
    return { deleted: true };
  }

  // Optional: Find by account_id and movie_id (composite key use-case)
  async findByAccountAndMovie(
    accountId: string,
    movieId: string,
  ): Promise<Watching | null> {
    return await this.watchingModel
      .findOne({ account_id: accountId, movie_id: movieId })
      .exec();
  }

  // Optional: Delete by composite key
  async deleteByAccountAndMovie(
    accountId: string,
    movieId: string,
  ): Promise<{ deleted: boolean }> {
    const result = await this.watchingModel
      .deleteOne({ account_id: accountId, movie_id: movieId })
      .exec();
    return { deleted: result.deletedCount > 0 };
  }

  // 🆕 Find all watchings by account_id
  async findWatchingsByAccount(accountId: string): Promise<Watching[]> {
    return await this.watchingModel.find({ account_id: accountId }).exec();
  }
}
