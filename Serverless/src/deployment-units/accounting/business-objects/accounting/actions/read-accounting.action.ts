import { ResponseMessage } from "@/enums/response-message.enum";
// Models
// utils
// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import ResponseModel from "src/shared/response.model";
import { SALE_ORDER_REPOSITORY } from "../sales-order.bo";

export const readAccountingHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const { id } = event.pathParameters;

  console.log("readMaterialHandler!!!");

  // Inserts item into DynamoDB table
  return SALE_ORDER_REPOSITORY.read(parseInt(id))
    .then((material) => {
      // Set Success Response
      response = new ResponseModel(
        { material },
        StatusCode.OK,
        ResponseMessage.GET_MATERIAL_SUCCESS,
      );
    })
    .catch((error) => {
      response =
        error instanceof ResponseModel
          ? error
          : new ResponseModel(
              {},
              StatusCode.ERROR,
              ResponseMessage.GET_MATERIAL_FAIL,
            );
    })
    .then(() => {
      return response.generate();
    });
};

export const readAccountingAction = readAccountingHandler;
