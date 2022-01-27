import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import { MATERIAL_RESPOSITORY } from "../materials.bo";
// utils

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";
import { validateAgainstConstraints } from "@/shared/utils/util";
import CreateMaterialValidator from "../validators/create.validator";

export const updateMaterialHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateMaterialValidator)
    .then(() => {
      return MATERIAL_RESPOSITORY.update(requestData);
    })
    .then((customer) => {
      response = new ResponseModel(
        { customer: customer },
        StatusCode.OK,
        ResponseMessage.UPDATE_MATERIAL_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.UPDATE_MATERIAL_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const updateMaterialAction = updateMaterialHandler;
