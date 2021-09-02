export default {
    name: {
        presence: {
            allowEmpty: false,
        },
        type: "string",
        length: {
            minimum: 3,
            tooShort: "needs to have %{count} words or more",
        },
    },
    surname: {
        presence: {
            allowEmpty: false,
        },
        type: "string",
        length: {
            minimum: 3,
            tooShort: "needs to have %{count} words or more",
        },
    },
    age: {
        presence: {
            allowEmpty: false,
        },
        type: "number",
    },
};
