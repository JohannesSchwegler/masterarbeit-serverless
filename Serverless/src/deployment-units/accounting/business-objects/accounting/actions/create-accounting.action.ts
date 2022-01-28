import { ResponseMessage } from "@/enums/response-message.enum";
import { StatusCode } from "@/enums/status-code.enum";
import { validateAgainstConstraints } from "@/shared/utils/util";
import { APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import ResponseModel from "src/shared/response.model";
import { ACCOUNTING_REPOSITORY } from "../accounting.bo";
import CreateAccountingValidator from "../validators/create.validator";

export const createAccountingHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  console.log(event);
  const requestData = event.body;

  return validateAgainstConstraints(requestData, CreateAccountingValidator)
    .then(() => {
      return ACCOUNTING_REPOSITORY.create(requestData);
    })
    .then((material) => {
      response = new ResponseModel(
        { material },
        StatusCode.OK,
        ResponseMessage.CREATE_MATERIAL_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.CREATE_MATERIAL_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const createAccountingAction = createAccountingHandler;
