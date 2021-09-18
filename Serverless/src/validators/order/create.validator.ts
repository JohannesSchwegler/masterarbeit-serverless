export default {
  customerId: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  materials: {
    presence: {
      allowEmpty: false,
    },
    type: "array",
  },
  price: {
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
};
