import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import { MATERIAL_RESPOSITORY } from "../materials.bo";
import ResponseModel from "@/shared/response.model";
import { ResponseMessage } from "@/enums/response-message.enum";
import { StatusCode } from "@/enums/status-code.enum";

export const listMaterialHandler: APIGatewayProxyHandler =
  async (): Promise<APIGatewayProxyResult> => {
    let response;

    return MATERIAL_RESPOSITORY.list()
      .then((materials) => {
        response = new ResponseModel(
          { materials },
          StatusCode.OK,
          ResponseMessage.LIST_MATERIAL_SUCCESS,
        );
      })
      .catch((error) => {
        response = ResponseModel.setErrorOrResponse(
          error,
          ResponseMessage.LIST_MATERIAL_FAIL,
        );
      })
      .then(() => {
        return response.generate();
      });
  };

export const listMaterialAction = listMaterialHandler;
