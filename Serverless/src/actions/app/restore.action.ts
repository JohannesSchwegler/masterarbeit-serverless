import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import ResponseModel from "src/models/response.model";
import databaseService from "src/services/database.service";
import { ResponseMessage } from "../../enums/response-message.enum";
// utils
// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { v4 as UUID } from "uuid";
export const restoreDefaultDataHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;
    const promises = [];

    promises.push(
      createMultiple(
        materials.map((mat) => {
          return {
            SK: "MAT",
            PK: `MAT#${UUID()}`,
            ...mat,
          };
        }),
      ),
    );

    return Promise.all([promises])
      .then(() => {
        // Set Success Response
        response = new ResponseModel(
          {},
          StatusCode.OK,
          ResponseMessage.CREATE_CUSTOMER_SUCCESS,
        );
      })
      .catch((error) => {
        response =
          error instanceof ResponseModel
            ? error
            : new ResponseModel(
                {},
                StatusCode.ERROR,
                ResponseMessage.CREATE_CUSTOMER_FAIL,
              );
      })
      .then(() => {
        return response.generate();
      });
  };

export const restoreDefaultDataAction = restoreDefaultDataHandler;

const createMultiple = async (data: Array<any>) => {
  const dataToList = data.map((item) => {
    console.log(item);
    return {
      PutRequest: {
        Item: {
          ...item,
        },
      },
    };
  });
  const params = {
    RequestItems: {
      [process.env.LIST_TABLE]: dataToList,
    },
  };

  console.log(dataToList);
  console.log("params", params.RequestItems.LIST_TABLE);

  const accounts = await databaseService.batch_write_items(params);
  return accounts;
};

const materials = [
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1001",
    code: "nvklal433",
    name: "Black Watch",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/black-watch.jpg",
    price: 72,
    category: "Accessories",
    quantity: 61,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1002",
    code: "zz21cz3c1",
    name: "Blue Band",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/blue-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1003",
    code: "244wgerg2",
    name: "Blue T-Shirt",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/blue-t-shirt.jpg",
    price: 29,
    category: "Clothing",
    quantity: 25,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1004",
    code: "h456wer53",
    name: "Bracelet",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/bracelet.jpg",
    price: 15,
    category: "Accessories",
    quantity: 73,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1005",
    code: "av2231fwg",
    name: "Brown Purse",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/brown-purse.jpg",
    price: 120,
    category: "Accessories",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4,
  },
  {
    id: "1006",
    code: "bib36pfvm",
    name: "Chakra Bracelet",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/chakra-bracelet.jpg",
    price: 32,
    category: "Accessories",
    quantity: 5,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
  {
    id: "1007",
    code: "mbvjkgip5",
    name: "Galaxy Earrings",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/galaxy-earrings.jpg",
    price: 34,
    category: "Accessories",
    quantity: 23,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1008",
    code: "vbb124btr",
    name: "Game Controller",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/game-controller.jpg",
    price: 99,
    category: "Electronics",
    quantity: 2,
    inventoryStatus: "LOWSTOCK",
    rating: 4,
  },
  {
    id: "1009",
    code: "cm230f032",
    name: "Gaming Set",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/gaming-set.jpg",
    price: 299,
    category: "Electronics",
    quantity: 63,
    inventoryStatus: "INSTOCK",
    rating: 3,
  },
  {
    id: "1010",
    code: "plb34234v",
    name: "Gold Phone Case",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/gold-phone-case.jpg",
    price: 24,
    category: "Accessories",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4,
  },
  {
    id: "1011",
    code: "4920nnc2d",
    name: "Green Earbuds",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/green-earbuds.jpg",
    price: 89,
    category: "Electronics",
    quantity: 23,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1012",
    code: "250vm23cc",
    name: "Green T-Shirt",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/green-t-shirt.jpg",
    price: 49,
    category: "Clothing",
    quantity: 74,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    id: "1013",
    code: "fldsmn31b",
    name: "Grey T-Shirt",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/grey-t-shirt.jpg",
    price: 48,
    category: "Clothing",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 3,
  },
  {
    id: "1014",
    code: "waas1x2as",
    name: "Headphones",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/headphones.jpg",
    price: 175,
    category: "Electronics",
    quantity: 8,
    inventoryStatus: "LOWSTOCK",
    rating: 5,
  },
  {
    id: "1015",
    code: "vb34btbg5",
    name: "Light Green T-Shirt",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/light-green-t-shirt.jpg",
    price: 49,
    category: "Clothing",
    quantity: 34,
    inventoryStatus: "INSTOCK",
    rating: 4,
  },
  {
    id: "1016",
    code: "k8l6j58jl",
    name: "Lime Band",
    description: "Product Description",
    image:
      "https://primefaces.org/primevue/showcase/demo/images/product/lime-band.jpg",
    price: 79,
    category: "Fitness",
    quantity: 12,
    inventoryStatus: "INSTOCK",
    rating: 3,
  },
];
