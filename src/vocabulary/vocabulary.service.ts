import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VocabularyDto } from './dto/create-vocabulary.dto';
import { Vocabulary } from './schema/vocabulary.schema';

export interface Pagination<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

@Injectable()
export class VocabularyService {
  constructor(
    @InjectModel(Vocabulary.name)
    private readonly vocabularyModel: Model<Vocabulary>,
  ) {}

  async save(dto: VocabularyDto, id?: string): Promise<Vocabulary> {
    if (id) {
      return await this.vocabularyModel.findByIdAndUpdate(
        id,
        { $set: dto },
        { new: true },
      );
    }
    return await this.vocabularyModel.create(dto);
  }

  async findAll(): Promise<Vocabulary[]> {
    return this.vocabularyModel.find().exec();
  }

  async findOne(id: string): Promise<Vocabulary> {
    return this.vocabularyModel.findById(id).exec();
  }

  async delete(id: string): Promise<Vocabulary> {
    return this.vocabularyModel.findByIdAndDelete(id).exec();
  }

  async getByPage({
    search,
    limit,
    page,
    sort,
  }: {
    page: number;
    search: string;
    sort: string;
    limit: number;
  }): Promise<Pagination<Vocabulary[]>> {
    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { word: { $regex: search, $options: 'i' } },
        { translation: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await this.vocabularyModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort) {
      const direction = sort.startsWith('-') ? -1 : 1;
      const field = sort.replace(/^-/, '');
      sortOptions = { [field]: direction };
    }

    const vocabularies = await this.vocabularyModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      data: vocabularies,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
