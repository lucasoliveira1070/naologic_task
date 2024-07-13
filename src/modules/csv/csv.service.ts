import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { CSVFile } from 'src/database/interfaces/csv.file';

@Injectable()
export class CsvService {
  async *processCsv(filePath: string): AsyncGenerator<CSVFile> {
    try {
      const stream = fs
        .createReadStream(filePath)
        .pipe(csv({ separator: '\t' }));

      for await (const row of stream) {
        yield row;
      }
    } catch (error) {
      throw new Error('Could not read the csv file');
    }
  }
}
