import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import ResponseModel from "src/models/response.model";
import { ResponseMessage } from "../../enums/response-message.enum";
// Enums
import { StatusCode } from "../../enums/status-code.enum";
// Models
import { MATERIAL_RESPOSITORY } from "../../models/material.model";
// utils
import { validateAgainstConstraints } from "../../utils/util";
import CreateMaterialValidator from "../../validators/material/create.validator";

export const createMaterialHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  // throw new createError.InternalServerError("das gibts net")
  // Initialize response variable
  let response;

  // Parse request parameters
  const requestData = JSON.parse(event.body);

  // Validate against constraints
  return validateAgainstConstraints(requestData, CreateMaterialValidator)
    .then(() => {
      MATERIAL_RESPOSITORY.create(requestData);
    })
    .then((materialId) => {
      // Set Success Response
      response = new ResponseModel(
        { materialId },
        StatusCode.OK,
        ResponseMessage.CREATE_MATERIAL_SUCCESS,
      );
    })
    .catch((error) => {
      // Set Error Response
      console.log(error);
      response =
        error instanceof ResponseModel
          ? error
          : new ResponseModel(
              {},
              StatusCode.ERROR,
              ResponseMessage.CREATE_MATERIAL_FAIL,
            );
    })
    .then(() => {
      // Return API Response
      return response.generate();
    });
};

export const createMaterialAction = createMaterialHandler;
