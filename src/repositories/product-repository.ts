import { Product } from 'src/types/product';

export abstract class ProductRepository {
  abstract saveMany(products: Product[]): Promise<string>;
}
