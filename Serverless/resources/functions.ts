export default {
  restoreDefaultData: {
    handler: "handler.restoreDefaultDataAction",
    events: [
      {
        http: {
          method: "post",
          path: "app/reset",
        },
      },
    ],
  },
  handleOrderCreation: {
    handler: "handler.handleOrderCreation",
    events: [
      {
        sns: "create-order-topic",
      },
    ],
  },

  createOrder: {
    handler: "handler.createOrderAction",
    events: [
      {
        http: {
          method: "post",
          path: "order",
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
  getMaterial: {
    handler: "handler.getMaterialAction",
    events: [
      {
        http: {
          method: "get",
          path: "material",
        },
      },
    ],
  },
  getMaterialById: {
    handler: "handler.getMaterialByIdAction",
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
  getCustomer: {
    handler: "handler.getCustomerAction",
    events: [
      {
        http: {
          method: "get",
          path: "customer",
        },
      },
    ],
  },
  getCustomerById: {
    handler: "handler.getCustomerByIdAction",
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
};
