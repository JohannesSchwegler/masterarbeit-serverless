import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { CUSTOMER_REPOSITORY } from "../customer.bo";
import ResponseModel from "src/shared/response.model";
import { ResponseMessage } from "@/enums/response-message.enum";
// Models
// utils
// Enums
import { StatusCode } from "@/enums/status-code.enum";

export const readCustomerHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const { id } = event.pathParameters;

  // Inserts item into DynamoDB table
  return CUSTOMER_REPOSITORY.read(parseInt(id))
    .then((customer) => {
      // Set Success Response
      response = new ResponseModel(
        { customer: customer },
        StatusCode.OK,
        ResponseMessage.GET_CUSTOMER_SUCCESS,
      );
    })
    .catch((error) => {
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
      return response.generate();
    });
};

export const readCustomerAction = readCustomerHandler;
