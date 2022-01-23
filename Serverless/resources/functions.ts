export default {
  childLambda: {
    handler: "handler.mainHandler",
  },
  saleOrderProcessingAction: {
    handler: "handler.saleOrderProcessingAction",
    events: [
      {
        http: {
          method: "post",
          path: "saleOrderProcessing",
        },
      },
    ],
  },
  listMaterial: {
    handler: "handler.listMaterialAction",
    events: [
      {
        http: {
          method: "get",
          path: "material",
        },
      },
    ],
  },
  createMaterial: {
    handler: "handler.createMaterialAction",
    events: [
      {
        http: {
          method: "post",
          path: "material",
        },
      },
    ],
  },
  readMaterial: {
    name: "readMaterialAction",
    handler: "handler.readMaterialAction",
    events: [
      {
        http: {
          method: "get",
          path: "material/{id}",
          request: {
            parameters: {
              paths: {
                id: true,
              },
            },
          },
        },
      },
    ],
  },
  // restoreDefaultData: {
  //   handler: "handler.restoreDefaultDataAction",
  //   events: [
  //     {
  //       http: {
  //         method: "post",
  //         path: "app/reset",
  //       },
  //     },
  //   ],
  // },
  // handleOrderCreation: {
  //   handler: "handler.handleOrderCreation",
  //   events: [
  //     {
  //       sns: "create-order-topic",
  //     },
  //   ],
  // },
  listCustomer: {
    handler: "handler.listCustomerAction",
    events: [
      {
        http: {
          method: "get",
          path: "customer",
        },
      },
    ],
  },
  createCustomer: {
    handler: "handler.createCustomerAction",
    events: [
      {
        http: {
          method: "post",
          path: "customer",
        },
      },
    ],
  },
  readCustomer: {
    handler: "handler.readCustomerAction",
    events: [
      {
        http: {
          method: "get",
          path: "customer/{id}",
          request: {
            parameters: {
              paths: {
                id: true,
              },
            },
          },
        },
      },
    ],
  },
  updateCustomer: {
    handler: "handler.updateCustomerAction",
    events: [
      {
        http: {
          method: "PUT",
          path: "customer/{id}",
          request: {
            parameters: {
              paths: {
                id: true,
              },
            },
          },
        },
      },
    ],
  },
};
