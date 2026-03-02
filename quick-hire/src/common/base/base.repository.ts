import { Injectable } from '@nestjs/common';
import { Document, Model, QueryOptions } from 'mongoose';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(filter: Record<string, unknown> = {}): Promise<T[]> {
    return this.model.find(filter).exec() as Promise<T[]>;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return doc.save() as Promise<T>;
  }

  async update(
    id: string,
    data: Record<string, unknown>,
    options: QueryOptions = { new: true },
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, { $set: data }, options)
      .exec() as Promise<T | null>;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }
}
