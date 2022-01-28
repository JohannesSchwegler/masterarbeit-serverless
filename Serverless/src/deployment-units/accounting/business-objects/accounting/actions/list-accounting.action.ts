import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { SALE_ORDER_REPOSITORY } from "../sales-order.bo";
import ResponseModel from "@/shared/response.model";
import { ResponseMessage } from "@/enums/response-message.enum";
import { StatusCode } from "@/enums/status-code.enum";

export const listAccountingHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;

    return SALE_ORDER_REPOSITORY.list()
      .then((saleorders) => {
        response = new ResponseModel(
          { saleorders },
          StatusCode.OK,
          ResponseMessage.GET_SALEORDER_SUCCESS,
        );
      })
      .catch((error) => {
        response = ResponseModel.setErrorOrResponse(
          error,
          ResponseMessage.GET_SALEORDER_FAIL,
        );
      })
      .then(() => {
        return response.generate();
      });
  };

export const listAccountingAction = listAccountingHandler;
