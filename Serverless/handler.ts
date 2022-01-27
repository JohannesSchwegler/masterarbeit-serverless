export {
  createCustomerAction,
  readCustomerAction,
  updateCustomerAction,
  deleteCustomerAction,
  listCustomerAction,
} from "./src/deployment-units/customer/business-objects/customer/actions/index";

export {
  createMaterialAction,
  readMaterialAction,
  updateMaterialAction,
  deleteMaterialAction,
  listMaterialAction,
} from "./src/deployment-units/material-management/business-objects/material/actions/index";

export { listSaleOrderAction } from "./src/deployment-units/sales/business-objects/salesorder/actions/index";

export { saleOrderProcessingAction } from "./src/deployment-units/sales/process-components/sale-order-processing/sale-order-processing.pc";

export { availabilityCheckAction } from "./src/deployment-units/material-management/process-components/availability-check.pc";

export { restoreDefaultDataAction } from "./src/shared/app/restore.action";

export async function pong(event, context, callback) {
  console.log("pong");
  console.log(JSON.stringify(event));
  // console.log(event.Records[0].Sns.Message);
  callback(null, { response: "return from lambda pong" });
}
