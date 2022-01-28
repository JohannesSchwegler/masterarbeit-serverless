import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { ACCOUNTING_REPOSITORY } from "../accounting.bo";
import ResponseModel from "@/shared/response.model";
import { ResponseMessage } from "@/enums/response-message.enum";
import { StatusCode } from "@/enums/status-code.enum";

export const listAccountingHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;

    return ACCOUNTING_REPOSITORY.list()
      .then((accountings) => {
        response = new ResponseModel(
          { accountings },
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
