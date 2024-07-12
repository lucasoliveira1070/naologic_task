import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductBuilder } from '../../builders/product-builder';
import { CsvService } from '../csv/csv.service';
import { ProductRepository } from 'src/repositories/product-repository';
import { Product } from 'src/database/interfaces/prd';
import { CSVFile } from 'src/database/interfaces/csv.file';
import generateEnhancedDescription from 'src/utils/generate-description';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,
    private readonly csvService: CsvService,
    private readonly productRepository: ProductRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async execute() {
    let countRows = 0;
    const productsToSave: Product[] = [];

    try {
      const batchSize = 1000;
      let batch: CSVFile[] = [];

      const groupedByProductId: Record<string, CSVFile[]> = {};
      const iterator = this.csvService.processCsv('./images40.txt');

      for await (const item of iterator) {
        batch.push(item as CSVFile);
        if (batch.length >= batchSize) {
          this.processBatch(batch, groupedByProductId);
          batch = [];
        }
      }

      if (batch.length > 0) {
        this.processBatch(batch, groupedByProductId);
      }

      Object.keys(groupedByProductId).forEach((productId) => {
        const items: CSVFile[] = groupedByProductId[productId];

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
          .build();

        productsToSave.push(product);
        countRows++;
      });

      const saveBatchSize = 500;
      for (let i = 0; i < productsToSave.length; i += saveBatchSize) {
        const batchToSave = productsToSave.slice(i, i + saveBatchSize);
        await this.productRepository.saveMany(batchToSave);
      }

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
    batch: CSVFile[],
    groupedByProductId: Record<string, CSVFile[]>,
  ) {
    batch.forEach((item) => {
      if (!groupedByProductId[item.ProductID]) {
        groupedByProductId[item.ProductID] = [];
      }
      groupedByProductId[item.ProductID].push(item);
    });
  }
}
