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
  });
  console.log("parsing done");
  await wait(5000);
  const data = JSON.stringify({
    body: {
      customerId: message.default.customerId,
      amount: message.default.amount,
    },
  });
  console.log(data);
  try {
    const res = await lambda
      .invoke({
        InvocationType: "RequestResponse",
        FunctionName: "master-dev-createAccounting",
        Payload: data,
      })
      .promise();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export const customerInvoiceProcessingAction = customerInvoiceProcessingHandler;
async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
