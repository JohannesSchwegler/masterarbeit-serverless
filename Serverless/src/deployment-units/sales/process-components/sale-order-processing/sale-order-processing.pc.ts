import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as AWS from "aws-sdk";

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";
import { validateAgainstConstraints } from "@/shared/utils/util";
import CreateSaleOrder from "./validators/create.validator";

export const saleOrderProcessingHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  console.log("!!!!!!! saleOrderProcessingHandler");
  let response;
  const requestData = JSON.parse(event.body);

  const lambda = new AWS.Lambda({
    region: "eu-west-1",
  });

  const sampleData = { number1: 1, number: 2 };

  const params = {
    FunctionName: "serverless-dev-child_lambda",
    Payload: JSON.stringify(sampleData),
  };

  try {
    await lambda.invoke(params, (res) => {
      console.log(res);
    });
  } catch (e) {
    console.log("invokeLambda :: Error: " + e);
  }

  //console.log("res0,", res);

  return validateAgainstConstraints(requestData, CreateSaleOrder)
    .then(() => {
      // return SALE_ORDER_REPOSITORY.create(requestData);
    })
    .then((material) => {
      response = new ResponseModel(
        { material },
        StatusCode.OK,
        ResponseMessage.CREATE_CUSTOMER_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.CREATE_CUSTOMER_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const saleOrderProcessingAction = saleOrderProcessingHandler;
