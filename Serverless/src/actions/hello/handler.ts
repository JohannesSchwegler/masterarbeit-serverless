import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "../../libs/apiGateway";
import { formatJSONResponse } from "../../libs/apiGateway";
import { middyfy } from "../../libs/lambda";

import schema from "./schema";

const helloHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
      return formatJSONResponse({
          message: `Hello , welcome to the exciting Serverless world!`,
      });
  };

export const hello = middyfy(helloHandler);
