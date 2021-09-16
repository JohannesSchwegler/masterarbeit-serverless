import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
// utils

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import ResponseModel from "src/models/response.model";
import databaseService from "src/services/database.service";

export const getMaterialByIdHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;

  // Parse path parameters

  const { id } = event.pathParameters;

  // Initialise DynamoDB PUT parameters
  const params = {
    TableName: process.env.LIST_TABLE,
    Key: {
      PK: `MATERIAL`,
      SK: `MAT#${id}`,
    },
  };
  // Inserts item into DynamoDB table
  return await databaseService
    .get(params)
    .then(({ Item }) => {
      // Set Success Response
      response = new ResponseModel(
        { material: Item },
        StatusCode.OK,
        ResponseMessage.GET_CUSTOMER_SUCCESS,
      );
    })
    .catch((error) => {
      console.log("catch");
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
      console.log("finally");
      // Return API Response
      return response.generate();
    });
};

export const getMaterialByIdAction = getMaterialByIdHandler;
