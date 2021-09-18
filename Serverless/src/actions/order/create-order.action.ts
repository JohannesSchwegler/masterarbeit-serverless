import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk"; // must be npm installed to use
import "source-map-support/register";
// Models
import OrderModel from "../../models/order.model";
import CreateOrderValidator from "../../validators/order/create.validator";
// utils
import { validateAgainstConstraints } from "../../utils/util";

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import ResponseModel from "src/models/response.model";
import databaseService from "src/services/database.service";

export const createOrderHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  // throw new createError.InternalServerError("das gibts net")
  // Initialize response variable
  let response;

  // Parse request parameters
  const requestData = JSON.parse(event.body);

  // Validate against constraints
  return validateAgainstConstraints(requestData, CreateOrderValidator)
    .then(async () => {
      // Initialise and hydrate model
      const orderModel = new OrderModel(requestData);

      // Get model data
      const order = orderModel.getEntityMappings();

      const params = {
        TableName: process.env.LIST_TABLE,
        Item: {
          PK: `CUST#${order.customerId}`,
          SK: `ORDER#${order.id}`,
          customerId: order.customerId,
          materials: order.materials,
          price: order.price,
        },
      };

      await databaseService.create(params);

      return order.id;
    })
    .then((orderId) => {
      // Pusblish sns message
      const sns = new AWS.SNS({
        endpoint: "http://127.0.0.1:4002",
        region: "us-east-1",
      });
      sns.publish(
        {
          Message: "hello!",
          MessageStructure: "json",
          TopicArn: "arn:aws:sns:us-east-1:123456789012:test-topic",
        },
        () => {
          console.log("ping");
        },
      );

      // Set Success Response
      response = new ResponseModel(
        { orderId },
        StatusCode.OK,
        ResponseMessage.CREATE_CUSTOMER_SUCCESS,
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
              ResponseMessage.CREATE_CUSTOMER_FAIL,
            );
    })
    .then(() => {
      // Return API Response
      return response.generate();
    });
};

export const createOrderAction = createOrderHandler;
