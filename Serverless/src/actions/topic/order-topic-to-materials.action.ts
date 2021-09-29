const orderTopicToMaterialsHandler = async (event) => {
  console.log(JSON.stringify(event));
  console.log("callback to tpoic was triggered");

  return "result";
};
export const orderTopicToMaterialsAction = orderTopicToMaterialsHandler;
