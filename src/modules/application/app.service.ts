import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProductBuilder } from '../../builders/product-builder';
import { CsvService } from '../csv/csv.service';
import { ProductRepository } from 'src/repositories/product-repository';
import { Product } from 'src/database/interfaces/prd';
import { CSVRow } from 'src/database/interfaces/csv.file';
import generateEnhancedDescription from 'src/utils/generate-description';
import { CRON_TIME, CSV_FILE_PATH } from 'src/config/enviroment.config';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,
    private readonly csvService: CsvService,
    private readonly productRepository: ProductRepository,
  ) {}

  @Cron(CRON_TIME)
  async execute() {
    let countRows = 0;
    const productsToSave: Product[] = [];

    try {
      const batchSize = 1000;
      let batch: CSVRow[] = [];

      const groupedByProductId: Record<string, CSVRow[]> = {};
      const iterator = this.csvService.processCsv(CSV_FILE_PATH);

      for await (const item of iterator) {
        batch.push(item as CSVRow);
        if (batch.length >= batchSize) {
          this.processBatch(batch, groupedByProductId);
          batch = [];
        }
      }

      if (batch.length > 0) {
        this.processBatch(batch, groupedByProductId);
      }

      Object.keys(groupedByProductId).forEach((productId) => {
        const items: CSVRow[] = groupedByProductId[productId];

        const product = ProductBuilder.initialize()
          .withId()
          .withDocId()
          .withCompanyId()
          .withData(items)
          .withDataPublic()
          .withDeploymentId()
          .withDocType()
          .withFullData()
          .withImmutable()
          .withInfo()
          .withNamespace()
          .withStatus()
          .withCategoryName(items[0].CategoryName)
          .withPrimaryCategory(items[0].PrimaryCategoryName)
          .withSecondaryCategory(items[0].SecondaryCategoryName)
          .withTDB(items[0].IsTBD)
          .build();

        productsToSave.push(product);
        countRows++;
      });

      const saveBatchSize = 500;
      for (let i = 0; i < productsToSave.length; i += saveBatchSize) {
        const batchToSave = productsToSave.slice(i, i + saveBatchSize);
        await this.productRepository.saveMany(batchToSave);
      }

      await this.productRepository.deleteMany();

      const randomProducts = await this.productRepository.findRandom();
      randomProducts.forEach(async (product) => {
        const response = await generateEnhancedDescription(
          product.data.name,
          product.data.description,
          `${product.categoryName} / ${product.primaryCategory} / ${product.secondaryCategory}`,
        );
        this.logger.log(`
              Product name: ${product.data.name}
              Product description: ${product.data.description}
              Category: ${product.categoryName} / ${product.primaryCategory} / ${product.secondaryCategory}

              New Description:${response}`);
      });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.logger.log(`Products generated and saved: ${countRows}`);
    }
  }

  private processBatch(
    batch: CSVRow[],
    groupedByProductId: Record<string, CSVRow[]>,
  ) {
    batch.forEach((item) => {
      if (!groupedByProductId[item.ProductID]) {
        groupedByProductId[item.ProductID] = [];
      }
      groupedByProductId[item.ProductID].push(item);
    });
  }
}
