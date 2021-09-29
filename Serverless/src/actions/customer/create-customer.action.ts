import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { createCustomer } from "../../models/customer.model";
// utils

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import ResponseModel from "src/models/response.model";
import { validateAgainstConstraints } from "../../utils/util";
import CreateCustomerValidator from "../../validators/customer/create.validator";

export const createCustomerHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateCustomerValidator)
    .then(async () => {
      return createCustomer(requestData);
    })
    .then((customer) => {
      // Set Success Response
      response = new ResponseModel(
        { customer: customer.toItemWithoutKeys() },
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

export const createCustomerAction = createCustomerHandler;
