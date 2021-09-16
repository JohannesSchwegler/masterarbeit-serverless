export default {
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
