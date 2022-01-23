import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { CUSTOMER_REPOSITORY } from "../customer.bo";
// utils

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";

export const deleteCustomerHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return CUSTOMER_REPOSITORY.delete(requestData)
    .then((customer) => {
      response = new ResponseModel(
        { customer: customer },
        StatusCode.OK,
        ResponseMessage.CREATE_CUSTOMER_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.CREATE_CUSTOMER_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const deleteCustomerAction = deleteCustomerHandler;
