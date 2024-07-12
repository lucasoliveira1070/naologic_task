import { Logger, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import MongoConnection from '../../database/mongo-connection';
import { DATABASE_NAME, DATABASE_URI } from '../../config/enviroment.config';
import { ConfigModule } from '@nestjs/config';
import { CsvModule } from '../csv/csv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    MongoConnection.connect(DATABASE_URI, DATABASE_NAME),
    CsvModule,
  ],
  providers: [AppService, Logger],
})
export class AppModule {}
