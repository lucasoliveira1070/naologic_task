import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import MongoConnection from '../../database/mongo-connection';
import { DATABASE_NAME, DATABASE_URI } from '../../config/enviroment.config';
import { ConfigModule } from '@nestjs/config';
import { CsvModule } from '../csv/csv.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MongoProduct,
  MongoProductSchema,
} from 'src/database/mongo-product-schema';
import { ProductRepository } from 'src/repositories/product-repository';
import { MongoProductRepository } from 'src/database/mongo-product-repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongoConnection.getModule(DATABASE_URI, DATABASE_NAME),
    MongooseModule.forFeature(
      [{ name: MongoProduct.name, schema: MongoProductSchema }],
      'naologic_task',
    ),

    ScheduleModule.forRoot(),
    CsvModule,
  ],
  providers: [
    { provide: ProductRepository, useClass: MongoProductRepository },
    AppService,
    Logger,
  ],
})
export class AppModule {}
