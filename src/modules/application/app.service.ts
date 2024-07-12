import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CSVFile } from '../../types/csv-file';
import { ProductBuilder } from '../../builders/product-builder';
import { CsvService } from '../csv/csv.service';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,
    private readonly csvService: CsvService,
  ) {}

  @Cron('* * * * * *')
  async execute() {
    let countRows = 0;
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

      Object.keys(groupedByProductId).map((productId) => {
        const items: CSVFile[] = groupedByProductId[productId];

        const product = ProductBuilder.initialize()
          .withId()
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
          .build();
        this.logger.log(product.data.name);
        countRows++;
      });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.logger.log('products generated:', countRows);
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
