import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";

import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";
import { validateAgainstConstraints } from "@/shared/utils/util";
import CreateSaleOrderValidator from "../validators/create.validator";
import { SALE_ORDER_REPOSITORY } from "../sales-order.bo";

export const createAccountingHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateSaleOrderValidator)
    .then(() => {
      return SALE_ORDER_REPOSITORY.create(requestData);
    })
    .then((material) => {
      response = new ResponseModel(
        { material },
        StatusCode.OK,
        ResponseMessage.CREATE_MATERIAL_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.CREATE_MATERIAL_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const creatAccountingAction = createAccountingHandler;
