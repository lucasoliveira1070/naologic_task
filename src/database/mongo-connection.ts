import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';

export default class MongoConnection {
  static getModule(
    uri: string,
    dbName: string,
    keyFilePath?: string,
  ): DynamicModule {
    if (keyFilePath) {
      return MongooseModule.forRoot(uri, {
        tls: true,
        tlsCertificateKeyFile: resolve(keyFilePath),
        dbName,
        connectionName: 'naologic_task',
      });
    }
    return MongooseModule.forRoot(uri, {
      dbName,
      connectionName: 'naologic_task',
    });
  }
}
