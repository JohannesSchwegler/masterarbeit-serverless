import "source-map-support/register";
import { MATERIAL_RESPOSITORY } from "../business-objects/material/materials.bo";

export const availabilityCheckHandler = async (event): Promise<any> => {
  const { id } = event;
  console.log("availabilityCheckHandler", id);

  // Inserts item into DynamoDB table
  return MATERIAL_RESPOSITORY.read(id)
    .then((material) => {
      if (material.quantity > 1) return { available: true, material };
    })
    .catch(() => {
      return { available: false };
    });
};

export const availabilityCheckAction = availabilityCheckHandler;
