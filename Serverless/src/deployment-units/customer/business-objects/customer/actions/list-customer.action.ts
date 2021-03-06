import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { CUSTOMER_REPOSITORY } from "../customer.bo";
import ResponseModel from "@/shared/response.model";
import { ResponseMessage } from "@/enums/response-message.enum";
import { StatusCode } from "@/enums/status-code.enum";

export const listCustomerHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;

    return CUSTOMER_REPOSITORY.list()
      .then((customers) => {
        response = new ResponseModel(
          { customers },
          StatusCode.OK,
          ResponseMessage.LIST_CUSTOMER_SUCCESS,
        );
      })
      .catch((error) => {
        response = ResponseModel.setErrorOrResponse(
          error,
          ResponseMessage.LIST_CUSTOMER_FAIL,
        );
      })
      .then(() => {
        return response.generate();
      });
  };

export const listCustomerAction = listCustomerHandler;
