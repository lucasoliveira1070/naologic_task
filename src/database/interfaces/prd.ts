export interface Product {
  _id: string;
  docId: string;
  fullData: any;
  data: Data;
  dataPublic: DataPublic;
  immutable: boolean;
  deploymentId: string;
  docType: string;
  namespace: string;
  companyId: string;
  status: string;
  info: Info;
  categoryName: string;
  primaryCategory: string;
  secondaryCategory: string;
  isTBD: string;
}

export interface Data {
  name: string;
  type: string;
  shortDescription: string;
  description: string;
  vendorId: string;
  manufacturerId: string;
  storefrontPriceVisibility: string;
  variants: Variant[];
  options: Option[];
  availability: string;
  isFragile: boolean;
  published: string;
  isTaxable: boolean;
  images: Image[];
  categoryId: string;
}

export interface Variant {
  id: string;
  available: boolean;
  attributes: Attributes;
  cost: number;
  currency: string;
  depth: any;
  description: string;
  dimensionUom: any;
  height: any;
  width: any;
  manufacturerItemCode: string;
  manufacturerItemId: string;
  packaging: string;
  price: number;
  volume: any;
  volumeUom: any;
  weight: any;
  weightUom: any;
  optionName: string;
  optionsPath: string;
  optionItemsPath: string;
  sku: string;
  active: boolean;
  images: Image[];
  itemCode: string;
}

export interface Attributes {}

export interface Image {
  fileName: string;
  cdnLink: string;
  i: number;
  alt: any;
}

export interface Option {
  name: string;
  values: Value[];
  id: string;
  dataField: any;
}

export interface Value {
  id: string;
  name: string;
  value: string;
}

export interface DataPublic {}

export interface Info {
  createdBy: string;
  createdAt: string;
  updatedBy: any;
  updatedAt: any;
  deletedBy: any;
  deletedAt: any;
  dataSource: string;
  companyStatus: string;
  transactionId: string;
  skipEvent: boolean;
  userRequestId: string;
}
