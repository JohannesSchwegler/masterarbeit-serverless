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

export { saleOrderProcessingAction } from "./src/deployment-units/sales/process-components/sale-order-processing/sale-order-processing.pc";
export async function mainHandler(event, context) {
  console.log("event: ", JSON.stringify(event));
  return context.functionName;
}
