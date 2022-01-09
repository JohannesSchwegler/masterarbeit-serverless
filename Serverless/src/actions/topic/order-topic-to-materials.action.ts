export const handleOrderCreation = (event, _context: any, callback) => {
  console.log("handleOrderCreation");
  console.log(JSON.stringify(event));
  // console.log(event.Records[0].Sns.Message);
  callback(null, { response: "return from lambda pong" });
};
