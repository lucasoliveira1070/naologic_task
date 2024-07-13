import { randomUUID } from 'crypto';
import { nanoid } from 'nanoid';
import { CSVRow } from 'src/database/interfaces/csv.file';
import { Data, Product } from 'src/database/interfaces/prd';

export class ProductBuilder {
  private readonly result: Product;

  static initialize() {
    return new ProductBuilder();
  }

  constructor() {
    this.result = {
      _id: null,
      companyId: null,
      data: null,
      dataPublic: null,
      deploymentId: null,
      docId: null,
      docType: null,
      fullData: null,
      immutable: null,
      info: null,
      namespace: null,
      status: null,
      categoryName: null,
      primaryCategory: null,
      secondaryCategory: null,
      isTBD: null,
    };
  }

  withId() {
    this.result._id = nanoid();
    return this;
  }

  withCompanyId() {
    this.result.companyId = '2yTnVUyG6H9yRX3K1qIFIiRz';
    return this;
  }

  withData(data: CSVRow[]) {
    const variants = data.map((item) => ({
      id: nanoid(),
      available: Number(item.QuantityOnHand) > 0,
      attributes: {
        packaging: item.PKG,
        description: item.ItemDescription,
      },
      cost: parseFloat(item.UnitPrice),
      currency: 'USD',
      depth: null,
      description: item.ItemDescription,
      dimensionUom: null,
      height: null,
      width: null,
      manufacturerItemCode: item.ManufacturerItemCode,
      manufacturerItemId: item.ItemID,
      packaging: item.PKG,
      price: parseFloat(item.UnitPrice) * 1.4,
      volume: null,
      volumeUom: null,
      weight: null,
      weightUom: null,
      optionName: `${item.PKG}, ${item.ItemDescription}`,
      optionsPath: 'rfrxmg.kegeqx',
      optionItemsPath: 'pgpvlx.lrtypd',
      sku: `${item.ItemID}${item.ProductID}${item.PKG}`,
      active: true,
      images: [
        {
          fileName: item.ImageFileName,
          cdnLink: item.ItemImageURL,
          i: 0,
          alt: null,
        },
      ],
      itemCode: item.NDCItemCode,
    }));

    const options = [
      {
        id: 'packaging',
        name: 'Packaging',
        dataField: null,
        values: Array.from(new Set(data.map((item) => item.PKG))).map(
          (pkg) => ({
            id: 'pctgaf',
            name: pkg,
            value: pkg,
          }),
        ),
      },
      {
        id: 'description',
        name: 'Description',
        dataField: null,
        values: Array.from(
          new Set(data.map((item) => item.ItemDescription)),
        ).map((desc) => ({
          id: 'cxuzfe',
          name: desc,
          value: desc,
        })),
      },
    ];

    const dataObj: Data = {
      name: data[0].ProductName,
      type: 'non-inventory',
      shortDescription: data[0].ProductDescription,
      description: data[0].ProductDescription,
      vendorId: nanoid(),
      manufacturerId: nanoid(),
      storefrontPriceVisibility: 'members-only',
      variants: variants,
      options: options,
      availability: data[0].Availability,
      isFragile: false,
      published: 'published',
      isTaxable: true,
      images: [
        {
          fileName: data[0].ImageFileName,
          cdnLink: data[0].ItemImageURL,
          i: 0,
          alt: null,
        },
      ],
      categoryId: data[0].CategoryID,
    };

    this.result.data = dataObj || null;
    return this;
  }

  withDataPublic() {
    this.result.dataPublic = {};
    return this;
  }

  withDeploymentId() {
    this.result.deploymentId = 'd8039';
    return this;
  }

  withDocId() {
    this.result.docId = nanoid();
    return this;
  }

  withDocType() {
    this.result.docType = 'item';
    return this;
  }

  withFullData() {
    this.result.fullData = null;
    return this;
  }

  withImmutable() {
    this.result.immutable = false;
    return this;
  }
  withCategoryName(categoryName: string) {
    this.result.categoryName = categoryName || null;
    return this;
  }

  withPrimaryCategory(primaryCategory: string) {
    this.result.primaryCategory = primaryCategory || null;
    return this;
  }

  withSecondaryCategory(secondaryCategory: string) {
    this.result.secondaryCategory = secondaryCategory || null;
    return this;
  }

  withInfo() {
    const info = {
      createdBy: 'IkFeiBarPUA3SNc3XiPY8yQl',
      createdAt: new Date().toISOString(),
      updatedBy: 'IkFeiBarPUA3SNc3XiPY8yQl',
      updatedAt: new Date().toISOString(),
      deletedBy: null,
      deletedAt: null,
      dataSource: 'nao',
      companyStatus: 'active',
      transactionId: '0HvDaDwphjaMuupWVEimO',
      skipEvent: false,
      userRequestId: randomUUID(),
    };
    this.result.info = info;
    return this;
  }

  withNamespace() {
    this.result.namespace = 'items';
    return this;
  }

  withStatus() {
    this.result.status = 'active';
    return this;
  }

  withTDB(isTBD: string) {
    this.result.isTBD = isTBD || '';
    return this;
  }

  build(): Product {
    return this.result;
  }
}
