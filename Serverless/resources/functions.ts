import schema from "../src/actions/hello/schema";

export default {
    hello: {
        handler: "handler.hello",
        events: [
            {
                http: {
                    method: "get",
                    path: "hello",
                    request: {
                        schema: {
                            "application/json": schema,
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
                    path: "customer/create",
                },
            },
        ],
    },
};
