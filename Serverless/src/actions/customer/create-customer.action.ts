import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import CustomerModel from "../../models/customer.model";
import CreateCustomerValidator from "../../validators/customer/create.validator";
// utils
import { validateAgainstConstraints } from "../../utils/util";

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import ResponseModel from "src/models/response.model";
import databaseService from "src/services/database.service";

export const createCustomerHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  // throw new createError.InternalServerError("das gibts net")
  // Initialize response variable
  let response;

  // Parse request parameters
  const requestData = JSON.parse(event.body);

  // Validate against constraints
  return validateAgainstConstraints(requestData, CreateCustomerValidator)
    .then(async () => {
      // Initialise and hydrate model
      const customerModel = new CustomerModel(requestData);

      // Get model data
      const customer = customerModel.getEntityMappings();

      // Initialise DynamoDB PUT parameters

      // Make a batchWrite-Operation to check if user already exists and then add user to
      // the set of user-ids. For more details refer to the access patterns for the user
      const params = {
        RequestItems: {
          [process.env.LIST_TABLE]: [
            {
              PutRequest: {
                Item: {
                  PK: `CUST#${customer.id}`,
                  SK: `CUST#${customer.id}`,
                  age: customer.age,
                  city: customer.city,
                  email: customer.email,
                },
              },
            },
            {
              UpdateRequest: {
                Item: {
                  PK: `CUSTOMERS`,
                  SK: `CUSTOMERS`,
                  CUSTOMERS: [customer.id],
                },
              },
            },
          ],
        },
      };

      // Inserts item into DynamoDB table
      //https://stackoverflow.com/questions/42103263/aws-dynamodb-how-to-achieve-in-1-call-add-value-to-set-if-set-exists-or-el
      await databaseService.batch_write_items(params);

      return customer.id;
    })
    .then((customerId) => {
      // Set Success Response
      response = new ResponseModel(
        { customerId },
        StatusCode.OK,
        ResponseMessage.CREATE_CUSTOMER_SUCCESS,
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
              ResponseMessage.CREATE_CUSTOMER_FAIL,
            );
    })
    .then(() => {
      // Return API Response
      return response.generate();
    });
};

export const createCustomerAction = createCustomerHandler;
