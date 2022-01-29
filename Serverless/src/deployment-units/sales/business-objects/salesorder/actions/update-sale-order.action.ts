import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { SALE_ORDER_REPOSITORY } from "../sales-order.bo";
// utils

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";
import { validateAgainstConstraints } from "@/shared/utils/util";
import CreateSaleOrderValidator from "../validators/create.validator";

export const updateSaleOrderHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateSaleOrderValidator)
    .then(() => {
      return SALE_ORDER_REPOSITORY.update(requestData);
    })
    .then((customer) => {
      response = new ResponseModel(
        { customer: customer },
        StatusCode.OK,
        ResponseMessage.UPDATE_SALEORDER_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.UPDATE_SALEORDER_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const updateSaleOrderAction = updateSaleOrderHandler;
