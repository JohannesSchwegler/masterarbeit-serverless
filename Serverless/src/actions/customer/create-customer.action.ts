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
            const params = {
                TableName: process.env.LIST_TABLE,
                Item: {
                    PK: customer.id,
                    SK: customer.name,
                },
            };
            // Inserts item into DynamoDB table
            await databaseService.create(params);
        })
        .then((data) => {
            // Set Success Response
            response = new ResponseModel(
                { customer: data },
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
