import { ResponseMessage } from "@/enums/response-message.enum";
// Models
// utils
// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import ResponseModel from "src/shared/response.model";
import { ACCOUNTING_REPOSITORY } from "../accounting.bo";

export const readAccountingHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const { id } = event.pathParameters;

  console.log("readMaterialHandler!!!");

  // Inserts item into DynamoDB table
  return ACCOUNTING_REPOSITORY.read(parseInt(id))
    .then((accounting) => {
      response = new ResponseModel(
        { accounting },
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
