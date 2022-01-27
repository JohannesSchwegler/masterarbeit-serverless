export enum ResponseMessage {
  CREATE_CUSTOMER_SUCCESS = "Customer successfully created",
  CREATE_CUSTOMER_FAIL = "Customer cannot be created",
  UPDATE_CUSTOMER_SUCCESS = "Customer successfully updated",
  UPDATE_CUSTOMER_FAIL = "Customer not updated",
  DELETE_CUSTOMER_SUCCESS = "Customer successfully deleted",
  DELETE_CUSTOMER_FAIL = "Customer cannot be deleted",
  GET_CUSTOMER_SUCCESS = "Customer successfully found",
  GET_CUSTOMER_FAIL = "Customer not found",
  LIST_CUSTOMER_SUCCESS = "Customers successfully found",
  LIST_CUSTOMER_FAIL = "Customers not found",

  CREATE_MATERIAL_SUCCESS = "Material successfully created",
  CREATE_MATERIAL_FAIL = "Material cannot be created",
  UPDATE_MATERIAL_SUCCESS = "Material successfully updated",
  UPDATE_MATERIAL_FAIL = "Material not updated",
  DELETE_MATERIAL_SUCCESS = "Material successfully deleted",
  DELETE_MATERIAL_FAIL = "Material cannot be deleted",
  GET_MATERIAL_SUCCESS = "Material successfully found",
  GET_MATERIAL_FAIL = "Material not found",
  LIST_MATERIAL_SUCCESS = "Materials successfully found",
  LIST_MATERIAL_FAIL = "Materials not found",

  CREATE_SALEORDER_SUCCESS = "Sale order successfully created",
  CREATE_SALEORDER_FAIL = "Sale order cannot be created",
  UPDATE_SALEORDER_SUCCESS = "Sale order successfully updated",
  UPDATE_SALEORDER_FAIL = "Sale order not updated",
  DELETE_SALEORDER_SUCCESS = "Sale order successfully deleted",
  DELETE_SALEORDER_FAIL = "Sale order cannot be deleted",
  GET_SALEORDER_SUCCESS = "Sale order successfully found",
  GET_SALEORDER_FAIL = "Sale order not found",
  LIST_SALEORDER_SUCCESS = "Sale orders successfully found",
  LIST_SALEORDER_FAIL = "Sale orders not found",

  ERROR = "Unknown error.",
  INVALID_REQUEST = "Invalid Request!",
}
