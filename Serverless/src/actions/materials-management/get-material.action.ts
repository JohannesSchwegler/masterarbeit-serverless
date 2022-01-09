import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { MATERIAL_RESPOSITORY } from "src/models/material.model";
import ResponseModel from "src/models/response.model";
import { ResponseMessage } from "../../enums/response-message.enum";
// Models
// utils
// Enums
import { StatusCode } from "../../enums/status-code.enum";

export const getMaterialHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;

    return MATERIAL_RESPOSITORY.list()
      .then((materials) => {
        console.log("!!!", materials);
        // Set Success Response
        response = new ResponseModel(
          { materials },
          StatusCode.OK,
          ResponseMessage.GET_MATERIAL_SUCCESS,
        );
      })
      .catch((error) => {
        // Set Error Response
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
        // Return API Response
        return response.generate();
      });
  };

export const getMaterialAction = getMaterialHandler;
