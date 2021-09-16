import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";
// Models
import MaterialModel from "../../models/material.model";
import CreateMaterialValidator from "../../validators/material/create.validator";
// utils
import { validateAgainstConstraints } from "../../utils/util";

// Enums
import { StatusCode } from "../../enums/status-code.enum";
import { ResponseMessage } from "../../enums/response-message.enum";
import ResponseModel from "src/models/response.model";
import databaseService from "src/services/database.service";

export const createMaterialHandler: APIGatewayProxyHandler = async (
  event,
): Promise<APIGatewayProxyResult> => {
  // throw new createError.InternalServerError("das gibts net")
  // Initialize response variable
  let response;

  // Parse request parameters
  const requestData = JSON.parse(event.body);

  // Validate against constraints
  return validateAgainstConstraints(requestData, CreateMaterialValidator)
    .then(async () => {
      // Initialise and hydrate model
      const materialModel = new MaterialModel(requestData);

      // Get model data
      const material = materialModel.getEntityMappings();

      const params = {
        TableName: process.env.LIST_TABLE,
        Item: {
          PK: `MATERIAL`,
          SK: `MAT#${material.id}`,
          id: material.id,
          code: material.code,
          name: material.name,
          description: material.description,
          image: material.image,
          category: material.category,
          price: material.price,
          quantity: material.quantity,
          inventoryStatus: material.inventoryStatus,
          rating: material.rating,
        },
      };

      await databaseService.create(params);

      return material.id;
    })
    .then((materialId) => {
      // Set Success Response
      response = new ResponseModel(
        { materialId },
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

export const createMaterialAction = createMaterialHandler;
