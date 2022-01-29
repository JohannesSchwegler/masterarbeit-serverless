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

export const saleOrderProcessingHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  let response;
  const requestData = JSON.parse(event.body);

  return validateAgainstConstraints(requestData, CreateSaleOrder)
    .then(async () => {
      const lambda = new AWS.Lambda({
        region: "eu-west-1",
      });

      const params = {
        InvocationType: "RequestResponse",
        FunctionName: "master-dev-availabilityCheck",
        Payload: JSON.stringify({ id: requestData.materialId }),
      };

      let isMaterialAvailable = false;
      let material = null;
      try {
        const res = await lambda.invoke(params).promise();
        const body = JSON.parse(res.Payload as any);
        isMaterialAvailable = body.available;
        material = body.material;
      } catch (e) {
        console.log("invokeLambda :: Error: " + e);
      }

      if (!isMaterialAvailable) {
        console.log("not!!!!!", isMaterialAvailable);
      }

      if (isMaterialAvailable) {
        console.log("is ava!!!!!", isMaterialAvailable);
        const sns = new AWS.SNS({
          region: "eu-west-1",
        });
        sns.publish(
          {
            Message: JSON.stringify({
              default: {
                customerId: requestData.customerId,
                amount: material.price,
              },
            }),
            TopicArn: process.env.SNS_TOPIC_ARN,
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
