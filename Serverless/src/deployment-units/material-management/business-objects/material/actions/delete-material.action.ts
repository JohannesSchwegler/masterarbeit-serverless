import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { MATERIAL_RESPOSITORY } from "../materials.bo";
// utils

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";

export const deleteMaterialHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return MATERIAL_RESPOSITORY.delete(requestData)
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

export const deleteMaterialAction = deleteMaterialHandler;
