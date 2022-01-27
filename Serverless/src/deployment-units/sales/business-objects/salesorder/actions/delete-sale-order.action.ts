import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { SALE_ORDER_REPOSITORY } from "../sales-order.bo";
// utils

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";

export const deleteSaleOrderHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return SALE_ORDER_REPOSITORY.delete(requestData)
    .then((material) => {
      response = new ResponseModel(
        { material },
        StatusCode.OK,
        ResponseMessage.DELETE_MATERIAL_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.DELETE_MATERIAL_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const deleteSaleOrderAction = deleteSaleOrderHandler;
