import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { CUSTOMER_REPOSITORY } from "src/models/customer.model";
import ResponseModel from "src/models/response.model";
import { ResponseMessage } from "../../enums/response-message.enum";
// Models
// utils
// Enums
import { StatusCode } from "../../enums/status-code.enum";

export const getCustomerHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;
    // Inserts item into DynamoDB table
    return CUSTOMER_REPOSITORY.list()
      .then((customers) => {
        // Set Success Response
        response = new ResponseModel(
          { customers: customers },
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
