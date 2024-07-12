import { Product } from 'src/database/interfaces/prd';

export abstract class ProductRepository {
  abstract saveMany(products: Product[]): Promise<string>;
  abstract findRandom(): Promise<Product[]>;
}
