import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
import * as AWS from "aws-sdk";

// Enums
import { StatusCode } from "@/enums/status-code.enum";
import { ResponseMessage } from "@/enums/response-message.enum";
import ResponseModel from "src/shared/response.model";
import { validateAgainstConstraints } from "@/shared/utils/util";
import CreateSaleOrder from "./validators/create.validator";
import { SALE_ORDER_REPOSITORY } from "../../business-objects/salesorder/sales-order.bo";
import { async } from "validate.js";

export const saleOrderProcessingHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  console.log("!!!!!!! saleOrderProcessingHandler");
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateSaleOrder)
    .then(async () => {
      const lambda = new AWS.Lambda({
        region: "eu-west-1",
        endpoint: "http://localhost:3002",
      });

      const params = {
        InvocationType: "RequestResponse",
        FunctionName: "master-dev-availabilityCheck",
        Payload: JSON.stringify({ id: requestData.materialId }),
      };

      let isMaterialAvailable = false;
      try {
        const res = await lambda.invoke(params).promise();
        const body = JSON.parse(res.Payload as any);
        isMaterialAvailable = body.available;
      } catch (e) {
        console.log("invokeLambda :: Error: " + e);
      }

      if (!isMaterialAvailable) {
        console.log("not!!!!!", isMaterialAvailable);
      }

      if (isMaterialAvailable) {
        console.log("is ava!!!!!", isMaterialAvailable);
        const sns = new AWS.SNS({
          endpoint: "http://127.0.0.1:4002",
          region: "eu-west-1",
        });
        sns.publish(
          {
            Message: JSON.stringify({
              default: {
                customerId: requestData.customerId,
                amount: 1230,
              },
            }),
            TopicArn: `arn:aws:sns:eu-west-1:123456789012:create-order-topic`,
          },
          () => console.log("ping"),
        );
      }
    })
    .then(() => {
      return SALE_ORDER_REPOSITORY.create(requestData);
    })
    .then((saleorder) => {
      response = new ResponseModel(
        { saleorder },
        StatusCode.OK,
        ResponseMessage.CREATE_SALEORDER_SUCCESS,
      );
    })
    .catch((error) => {
      response = ResponseModel.setErrorOrResponse(
        error,
        ResponseMessage.CREATE_SALEORDER_FAIL,
      );
    })
    .then(() => {
      return response.generate();
    });
};

export const saleOrderProcessingAction = saleOrderProcessingHandler;
