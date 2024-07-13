import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Data, DataPublic, Info, Product } from 'src/database/interfaces/prd';

export type MongoProductDocument = HydratedDocument<MongoProduct>;

@Schema({ timestamps: false, collection: 'products', autoIndex: true })
export class MongoProduct implements Product {
  @Prop({ required: true })
  _id: string;
  @Prop({ required: false })
  docId: string;
  @Prop({ required: false, type: Object })
  fullData: any;
  @Prop({ required: true, type: Object })
  data: Data;
  @Prop({ required: true, type: Object })
  dataPublic: DataPublic;
  @Prop({ required: true })
  immutable: boolean;
  @Prop({ required: true })
  deploymentId: string;
  @Prop({ required: true })
  docType: string;
  @Prop({ required: true })
  namespace: string;
  @Prop({ required: true })
  companyId: string;
  @Prop({ required: true })
  status: string;
  @Prop({ required: true, type: Object })
  info: Info;
  @Prop({ required: false })
  categoryName: string;
  @Prop({ required: false })
  primaryCategory: string;
  @Prop({ required: false })
  secondaryCategory: string;
  @Prop({ required: false })
  isTBD: string;
}

export const MongoProductSchema = SchemaFactory.createForClass(MongoProduct);

MongoProductSchema.index({ docId: 1 });
