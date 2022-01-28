import * as AWS from "aws-sdk";
import "source-map-support/register";

const customerInvoiceProcessingHandler = async (
  event,
  context,
): Promise<any> => {
  console.log("pong", event, context);
  const message = JSON.parse(event.Records[0].Sns.Message);
  const lambda = new AWS.Lambda({
    region: "eu-west-1",
    endpoint: "http://localhost:3002",
  });

  setTimeout(() => {
    console.log("customerInvoiceProcessingHandler");
    const data = JSON.stringify({
      body: {
        customerId: message.default.customerId,
        amount: message.default.amount,
      },
    });
    console.log(data);
    lambda
      .invoke({
        InvocationType: "RequestResponse",
        FunctionName: "master-dev-createAccounting",
        Payload: data,
      })
      .promise()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, 5000);
};

export const customerInvoiceProcessingAction = customerInvoiceProcessingHandler;
