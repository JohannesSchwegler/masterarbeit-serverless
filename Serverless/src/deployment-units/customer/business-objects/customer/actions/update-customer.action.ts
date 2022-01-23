import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { CUSTOMER_REPOSITORY } from "../customer.bo";
// utils

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";
import { validateAgainstConstraints } from "@/shared/utils/util";
import CreateCustomerValidator from "../validators/create.validator";

export const updateCustomerHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateCustomerValidator)
    .then(() => {
      return CUSTOMER_REPOSITORY.update(requestData);
    })
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

export const updateCustomerAction = updateCustomerHandler;
