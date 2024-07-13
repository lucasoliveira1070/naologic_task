import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductRepository } from 'src/repositories/product-repository';
import { MongoProduct } from './mongo-product-schema';
import { Model } from 'mongoose';
import { Product } from './interfaces/prd';

@Injectable()
export class MongoProductRepository extends ProductRepository {
  constructor(
    @InjectModel(MongoProduct.name, 'naologic_task')
    private readonly MongoProductModel: Model<MongoProduct>,
  ) {
    super();
  }

  public async saveMany(products: Product[]): Promise<string> {
    const result = await this.MongoProductModel.insertMany(products);
    return `${result.length} documents saved successfully`;
  }

  public async findRandom(): Promise<Product[]> {
    return await this.MongoProductModel.aggregate([{ $sample: { size: 10 } }]);
  }

  public async deleteMany(): Promise<string> {
    const result = await this.MongoProductModel.deleteMany({ isTBD: 'Y' });
    return `${result.deletedCount} documents deleted`;
  }
}
