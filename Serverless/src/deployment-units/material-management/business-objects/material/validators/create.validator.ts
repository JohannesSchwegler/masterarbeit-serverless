export default {
  code: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
    length: {
      minimum: 3,
      tooShort: "needs to have %{count} words or more",
    },
  },
  name: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  description: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  image: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  price: {
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
  category: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },

  quantity: {
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
  inventoryStatus: {
    presence: {
      allowEmpty: false,
    },
    type: "string",
  },
  rating: {
    presence: {
      allowEmpty: false,
    },
    type: "number",
  },
};
