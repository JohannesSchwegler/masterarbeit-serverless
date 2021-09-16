import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
// utils

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import ResponseModel from "src/models/response.model";
import databaseService from "src/services/database.service";

export const getCustomerHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;

    // Initialise DynamoDB PUT parameters
    const params = {
      TableName: process.env.LIST_TABLE,
      Key: {
        PK: "CUSTOMERS",
        SK: "CUSTOMERS",
      },
    };
    // Inserts item into DynamoDB table
    return await databaseService
      .get(params)
      .then(({ Item }) => {
        // Set Success Response
        response = new ResponseModel(
          { customers: Item.Customers },
          StatusCode.OK,
          ResponseMessage.GET_CUSTOMER_SUCCESS,
        );
      })
      .catch((error) => {
        // Set Error Response
        response =
          error instanceof ResponseModel
            ? error
            : new ResponseModel(
                {},
                StatusCode.ERROR,
                ResponseMessage.GET_CUSTOMER_FAIL,
              );
      })
      .then(() => {
        // Return API Response
        return response.generate();
      });
  };

export const getCustomerAction = getCustomerHandler;
