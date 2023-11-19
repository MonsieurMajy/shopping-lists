import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery(`INSERT INTO shopping_lists (name) VALUES ('${ name }')`);
};

const findAllActiveLists = async () => {
  return await executeQuery(`SELECT * FROM shopping_lists WHERE active = TRUE`);
};

export { create, findAllActiveLists };