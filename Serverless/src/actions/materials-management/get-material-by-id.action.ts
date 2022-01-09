import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { MATERIAL_RESPOSITORY } from "src/models/material.model";
import ResponseModel from "src/models/response.model";
import { ResponseMessage } from "../../enums/response-message.enum";
// Models
// utils
// Enums
import { StatusCode } from "../../enums/status-code.enum";

export const getMaterialByIdHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const { id } = event.pathParameters;

  return MATERIAL_RESPOSITORY.getById(parseInt(id))
    .then(({ Item }) => {
      // Set Success Response
      response = new ResponseModel(
        { material: Item },
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

export const getMaterialByIdAction = getMaterialByIdHandler;
